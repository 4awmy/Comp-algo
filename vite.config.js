import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { spawn } from 'child_process'

// A local proxy to run the authenticated gemini CLI on the student's machine
function geminiLocalProxyPlugin() {
  return {
    name: 'gemini-local-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const urlPath = req.url ? req.url.split('?')[0] : '';
        if (urlPath === '/api/tutor' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { context, userMessage, history } = JSON.parse(body);
              
              const systemPrompt = `You are "Antigravity Tutor", an expert AI computer science teaching assistant for Dr. Moheeb's "Computing Algorithms" course at the Arab Academy for Science and Technology (AAST).
Your goal is to help students understand the lecture slides and algorithm concepts in a friendly, encouraging, and highly educational manner.

Current slide context:
- Course: Computing Algorithms (Dr. Moheeb — AAST)
- Lecture: "${context.lectureTitle || "Algorithms"}"
- Slide ${context.slideNum || 1}: "${context.slideTitle || "Untitled Slide"}"
- Slide Bullet Points: ${JSON.stringify(context.slideContent || [])}
${context.ocrContent ? `- OCR Extracted Text: "${context.ocrContent}"` : ''}
${context.speakerNotes ? `- Speaker Notes/Context: "${context.speakerNotes}"` : ''}

Instructions:
1. Explain the concepts clearly, step-by-step.
2. Use markdown formatting for code snippets, lists, and bold text. Keep code blocks neat (use Javascript, Python, C++, or pseudocode where helpful).
3. Connect your explanations to the slide content above when applicable.
4. Keep answers concise, highly pedagogical, and easy for undergraduate students to read.
5. If the user asks general algorithm questions, answer them in the context of academic computer science.`;

              let fullPrompt = `${systemPrompt}\n\n`;
              if (history && history.length > 0) {
                fullPrompt += "Conversation History:\n";
                history.forEach(msg => {
                  fullPrompt += `${msg.sender === 'user' ? 'Student' : 'Tutor'}: ${msg.text}\n`;
                });
                fullPrompt += "\n";
              }
              fullPrompt += `Student Question: ${userMessage}`;

              // Spawn Gemini CLI process
              const child = spawn('gemini', ['-m', 'gemini-2.5-flash', '--output-format', 'text'], {
                shell: true
              });

              let stdout = '';
              let stderr = '';

              child.stdout.on('data', data => {
                stdout += data.toString();
              });

              child.stderr.on('data', data => {
                stderr += data.toString();
              });

              child.on('close', code => {
                const lines = stdout.split('\n');
                const cleanLines = lines.filter(line => {
                  const trimmed = line.trim();
                  return (
                    trimmed !== '' &&
                    !trimmed.startsWith('Warning:') &&
                    !trimmed.startsWith('Hook system message:') &&
                    !trimmed.startsWith('Skill conflict') &&
                    !trimmed.startsWith('MCP issues') &&
                    !trimmed.startsWith('Failed to compile') &&
                    !trimmed.startsWith('Ripgrep is not available')
                  );
                });
                const text = cleanLines.join('\n').trim();

                if (code === 0 && text) {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ text }));
                } else {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: stderr || 'Gemini CLI failed to respond.' }));
                }
              });

              child.stdin.write(fullPrompt);
              child.stdin.end();

            } catch (err) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Malformed request: ' + err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), geminiLocalProxyPlugin()],
  base: '/Comp-algo/',
})
