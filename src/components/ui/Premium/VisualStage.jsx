import styles from './Premium.module.css';

/**
 * VisualStage - A high-spacing container for algorithm visualizations.
 * 
 * @param {string} title - Title for the visualization stage.
 * @param {string} description - Optional footer text/explanation.
 * @param {React.ReactNode} children - The actual visualizer component.
 * @param {React.ReactNode} actions - Optional toolbar/actions (e.g., Play/Pause).
 */
const VisualStage = ({ title, description, children, actions, style, className = '' }) => {
  return (
    <section className={`${styles.visualStage} ${className}`} style={style}>
      <div className={styles.visualStageHeader}>
        <h3 className={styles.visualStageTitle}>{title}</h3>
        {actions && <div className={styles.visualStageActions}>{actions}</div>}
      </div>
      
      <div className={styles.visualStageContent}>
        {children}
      </div>

      {description && (
        <div className={styles.visualStageFooter}>
          <p>{description}</p>
        </div>
      )}
    </section>
  );
};

export default VisualStage;
