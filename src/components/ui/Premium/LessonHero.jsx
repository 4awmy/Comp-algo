import React, { useState } from 'react';
import styles from './Premium.module.css';

/**
 * LessonHero - A premium editorial header for lesson pages.
 * 
 * @param {string} title - The main heading.
 * @param {string} subtitle - Descriptive sub-text.
 * @param {string} tag - Small tag displayed above the title (e.g., "Lecture 11").
 * @param {string} presentationPdf - Optional path to a PDF of the professor's slides to view in a modal.
 */
const LessonHero = ({ title, subtitle, tag, presentationPdf }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.lessonHero}>
      <div className={styles.heroContent}>
        {tag && <span className={styles.heroTag}>{tag}</span>}
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}

        {presentationPdf && (
          <div style={{ marginTop: '1rem' }}>
            <button className={styles.presentationToggleButton} onClick={() => setOpen(true)}>View Prof Slides</button>
          </div>
        )}
      </div>

      {open && (
        <div className={styles.presentationModal} onClick={() => setOpen(false)}>
          <div className={styles.presentationModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.presentationCloseBtn} onClick={() => setOpen(false)}>Close ✕</button>
            <iframe className={styles.presentationIframe} src={presentationPdf} title="Professor Slides" />
          </div>
        </div>
      )}
    </header>
  );
};

export default LessonHero;
