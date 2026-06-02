// ── Gemini AI Tutor Service ────────────────────────────────────
// Connects directly to the Gemini API from the client.
// Uses fetch to avoid large Node SDK dependencies in the browser build.

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Sends a message to the AI Tutor with context about the current lecture/slide.
 * 
 * @param {object} context - Context about the current slide
 * @param {string} context.lectureTitle - Title of the lecture
 * @param {number} context.slideNum - Number of the slide
 * @param {string} context.slideTitle - Title of the slide
 * @param {string[]} context.slideContent - Bullets/lines of text on the slide
 * @param {string} context.ocrContent - OCR extracted text if it was a screenshot
 * @param {string} context.speakerNotes - Notes attached to the slide
 * @param {string} userMessage - The student's question
 * @param {Array} history - Previous messages: [{ sender: 'user'|'bot', text: string }]
 */
export async function chatWithTutor(context, userMessage, history = []) {
  // 1. Try local dev proxy endpoint (which executes the local authenticated gemini CLI)
  try {
    const localResponse = await fetch('/api/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ context, userMessage, history })
    });

    if (localResponse.ok) {
      const contentType = localResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await localResponse.json();
        if (data && data.text) {
          return data.text;
        }
      }
    }
  } catch (localError) {
    console.warn("Local tutor proxy not available, falling back to direct API:", localError);
  }

  // 2. Direct API Fallback (used in production static build or when local proxy fails)
  // Build system prompt
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

  // Map history to Gemini API format
  // Gemini expects: { role: 'user'|'model', parts: [{ text: string }] }
  const contents = [];
  
  history.forEach(msg => {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  });

  // Append current message
  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  const payload = {
    contents: contents,
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000,
    }
  };

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error("Empty response from Gemini API");
    }

    return candidateText;
  } catch (error) {
    console.error("AI Tutor API call failed:", error);
    throw error;
  }
}

