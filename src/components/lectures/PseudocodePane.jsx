import styles from './Lectures.module.css'

/**
 * PseudocodePane component for rendering algorithm pseudocode with line-level interaction.
 * 
 * @param {Object} props
 * @param {string[]} props.pseudocode - Array of strings representing each line of code.
 * @param {number|string} props.activeLine - The ID or index of the currently active line.
 * @param {Function} props.onLineClick - Callback function when a line is clicked.
 */
export default function PseudocodePane({ pseudocode = [], activeLine, onLineClick }) {
  return (
    <div className={styles.pseudocodeContainer}>
      <div className={styles.pseudocodeHeader}>
        <span className={styles.pseudocodeTitle}>Pseudocode</span>
      </div>
      <div className={styles.codeArea}>
        {pseudocode.map((line, index) => {
          const lineNumber = index + 1
          const isActive = activeLine === lineNumber || activeLine === String(lineNumber)

          return (
            <div
              key={index}
              className={`${styles.codeLine} ${isActive ? styles.activeLine : ''}`}
              onClick={() => onLineClick && onLineClick(lineNumber)}
            >
              <span className={styles.lineNumber}>{lineNumber}</span>
              <span className={styles.lineContent}>{line}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
