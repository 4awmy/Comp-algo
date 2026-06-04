import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import CircularAIFab from './CircularAIFab'
import AITutorBubble from '../chat/AITutorBubble'
import { chatWithTutor } from '../../services/geminiService'
import styles from './MainLayout.module.css'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [aiOpen, setAiOpen] = useState(false)
  
  // AI Tutor State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your AI Tutor. How can I help you with Computing Algorithms today?' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [sendingChat, setSendingChat] = useState(false)

  const handleSendChat = async (e) => {
    if (e) e.preventDefault()
    if (!chatInput.trim() || sendingChat) return

    const userMsg = chatInput.trim()
    setChatInput('')
    const newHistory = [...chatMessages, { sender: 'user', text: userMsg }]
    setChatMessages(newHistory)
    setSendingChat(true)

    try {
      const response = await chatWithTutor({ lectureTitle: 'General Algorithms' }, userMsg, chatMessages)
      setChatMessages([...newHistory, { sender: 'bot', text: response }])
    } catch (err) {
      setChatMessages([...newHistory, { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setSendingChat(false)
    }
  }

  return (
    <div className={styles.layout}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        className={styles.main}
        style={{ '--sidebar-offset': sidebarOpen ? 'var(--sidebar-width)' : '0px' }}
      >
        <TopBar onMenuClick={() => setSidebarOpen(o => !o)} sidebarOpen={sidebarOpen} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      
      <CircularAIFab 
        isOpen={aiOpen} 
        onClick={() => setAiOpen(!aiOpen)} 
      />

      <AITutorBubble 
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        chatMessages={chatMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        sendingChat={sendingChat}
        onSendMessage={handleSendChat}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
