import React, { useState, useEffect, useRef } from 'react';
import styles from './Premium.module.css';

/**
 * LessonHero - A premium editorial header for lesson pages.
 * 
 * @param {string} title - The main heading.
 * @param {string} subtitle - Descriptive sub-text.
 * @param {string} tag - Small tag displayed above the title (e.g., "Lecture 11").
 * @param {string} presentationPdf - Optional path to a PDF of the professor's slides to view in a modal.
 * @param {string[]} presentationSlides - Optional array of image URLs to present as a slideshow (used when PDF not available).
 */
const LessonHero = ({ title, subtitle, tag, presentationPdf, presentationSlides = [] }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playRef = useRef(null);

  useEffect(() => {
    if (playing) {
      playRef.current = setInterval(() => setIndex(i => (i + 1) % Math.max(1, presentationSlides.length)), 2500);
    } else if (playRef.current) {
      clearInterval(playRef.current);
      playRef.current = null;
    }
    return () => { if (playRef.current) { clearInterval(playRef.current); playRef.current = null; } };
  }, [playing, presentationSlides.length]);

  const hasSlides = presentationSlides && presentationSlides.length > 0;

  const openModal = () => {
    setOpen(true);
    setIndex(0);
  };

  const closeModal = () => {
    setOpen(false);
    setPlaying(false);
  };

  return (
    <header className={styles.lessonHero}>
      <div className={styles.heroContent}>
        {tag && <span className={styles.heroTag}>{tag}</span>}
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}

        {(presentationPdf || hasSlides) && (
          <div style={{ marginTop: '1rem' }}>
            <button className={styles.presentationToggleButton} onClick={openModal}>View Prof Slides</button>
          </div>
        )}
      </div>

      {open && (
        <div className={styles.presentationModal} onClick={closeModal}>
          <div className={styles.presentationModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.presentationCloseBtn} onClick={closeModal}>Close ✕</button>

            {presentationPdf && !hasSlides && (
              <iframe className={styles.presentationIframe} src={presentationPdf} title="Professor Slides" />
            )}

            {hasSlides && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={presentationSlides[index]} alt={`slide ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
                  <button className={styles.presentationToggleButton} onClick={() => setIndex(i => (i - 1 + presentationSlides.length) % presentationSlides.length)}>Prev</button>
                  <div style={{ color: 'var(--text-muted)' }}>{index + 1} / {presentationSlides.length}</div>
                  <button className={styles.presentationToggleButton} onClick={() => setIndex(i => (i + 1) % presentationSlides.length)}>Next</button>
                  <button className={styles.presentationToggleButton} onClick={() => setPlaying(p => !p)}>{playing ? 'Pause' : 'Play'}</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
};

export default LessonHero;
