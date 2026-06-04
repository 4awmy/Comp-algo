import styles from './CircularAIFab.module.css';

export default function CircularAIFab({ onClick, isOpen }) {
  return (
    <button 
      className={`${styles.fab} ${isOpen ? styles.active : ''}`} 
      onClick={onClick}
      aria-label="Toggle AI Tutor"
    >
      <svg 
        className={styles.icon} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    </button>
  );
}
