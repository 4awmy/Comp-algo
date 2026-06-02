import styles from './Premium.module.css';

/**
 * LessonHero - A premium editorial header for lesson pages.
 * 
 * @param {string} title - The main heading.
 * @param {string} subtitle - Descriptive sub-text.
 * @param {string} tag - Small tag displayed above the title (e.g., "Lecture 11").
 */
const LessonHero = ({ title, subtitle, tag }) => {
  return (
    <header className={styles.lessonHero}>
      <div className={styles.heroContent}>
        {tag && <span className={styles.heroTag}>{tag}</span>}
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
      </div>
    </header>
  );
};

export default LessonHero;
