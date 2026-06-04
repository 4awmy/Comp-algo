import { useState } from 'react';
import styles from './PremiumImage.module.css';
import LightboxPortal from './LightboxPortal';

const PremiumImage = ({ src, alt, caption, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const baseUrl = import.meta.env.BASE_URL;
  const finalSrc = src.startsWith('/') && !src.startsWith(baseUrl) 
    ? `${baseUrl}${src.slice(1)}` 
    : src;

  return (
    <>
      <figure className={`${styles.figure} ${className}`}>
        <div 
          className={styles.imageContainer} 
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          aria-label={`Zoom image: ${alt}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
        >
          <img src={finalSrc} alt={alt} className={styles.image} loading="lazy" />
        </div>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>

      {isOpen && (
        <LightboxPortal 
          src={src} 
          alt={alt} 
          caption={caption} 
          onClose={handleClose} 
        />
      )}
    </>
  );
};

export default PremiumImage;
