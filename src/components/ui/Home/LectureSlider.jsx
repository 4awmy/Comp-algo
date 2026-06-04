import { useRef } from 'react';
import styles from './LectureSlider.module.css';

export default function LectureSlider({ children }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <button 
        className={`${styles.arrow} ${styles.arrowLeft}`} 
        onClick={() => scroll('left')}
        aria-label="Previous lectures"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      
      <div className={styles.slider} ref={sliderRef}>
        {children.map((child, index) => (
          <div key={index} className={styles.slide}>
            {child}
          </div>
        ))}
      </div>

      <button 
        className={`${styles.arrow} ${styles.arrowRight}`} 
        onClick={() => scroll('right')}
        aria-label="Next lectures"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  );
}
