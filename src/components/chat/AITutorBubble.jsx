import { useState, useRef, useEffect } from 'react'
;
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './AITutorBubble.module.css';

export default function AITutorBubble({ 
  chatMessages, 
  onSendMessage, 
  sendingChat, 
  chatInput, 
  setChatInput 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isOpen]);

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <span className={styles.headerTitle}>🤖 Antigravity AI Tutor</span>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className={styles.chatMessages}>
            {chatMessages.map((msg, i) => (
              <div key={i} className={`${styles.message} ${msg.sender === 'user' ? styles.messageUser : styles.messageBot}`}>
                <div className={`${styles.messageSender} ${msg.sender === 'user' ? styles.messageSenderUser : styles.messageSenderBot}`}>
                  {msg.sender === 'user' ? 'You' : 'AI Tutor'}
                </div>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            ))}
            {sendingChat && (
              <div className={`${styles.message} ${styles.messageBot}`}>
                <div className={styles.messageSenderBot}>AI Tutor</div>
                <div>Typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.chatInputArea} onSubmit={onSendMessage}>
            <input 
              type="text" 
              className={styles.chatInput}
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={sendingChat}
            />
            <button type="submit" className={styles.sendBtn} disabled={sendingChat || !chatInput.trim()}>
              ➤
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button className={styles.bubbleBtn} onClick={() => setIsOpen(true)}>
          🤖 
        </button>
      )}
    </div>
  );
}
