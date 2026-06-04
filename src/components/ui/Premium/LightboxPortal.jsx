import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './PremiumImage.module.css';

const LightboxPortal = ({ src, alt, caption, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling on body when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.lightboxOverlay} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Image lightbox">
      <div className={styles.lightboxContent}>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close lightbox"
        >
          &times;
        </button>
        <img src={src} alt={alt} className={styles.lightboxImage} />
        {caption && <div className={styles.lightboxCaption}>{caption}</div>}
      </div>
    </div>,
    document.body
  );
};

export default LightboxPortal;
