import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import styles from './Premium.module.css';

/**
 * MathBlock - A premium wrapper for mathematical notation.
 * 
 * @param {string} math - The LaTeX string to render.
 * @param {boolean} block - Whether to render as block-level (centered) or inline.
 * @param {string} caption - Optional caption displayed below block-level math.
 * @param {string} className - Optional additional class names.
 */
const MathBlock = ({ math, block = false, caption, className = '', style }) => {
  if (block) {
    return (
      <div className={`${styles.mathContainer} ${className}`} style={style}>
        <BlockMath math={math} />
        {caption && <p className={styles.mathCaption}>{caption}</p>}
      </div>
    );
  }

  return (
    <span className={`${styles.inlineMath} ${className}`}>
      <InlineMath math={math} />
    </span>
  );
};

export default MathBlock;
