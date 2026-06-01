import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PseudocodePane from './PseudocodePane';
import AlgorithmVisualizer from '../visualization/AlgorithmVisualizer';
import styles from './Lectures.module.css';

/**
 * LessonBlock component dispatches rendering based on a 'type' prop.
 * 
 * @param {Object} props
 * @param {Object} props.block - The block data.
 * @param {string} props.block.type - 'text' | 'code' | 'visual'
 * @param {any} props.block.content - Content for text/markdown
 * @param {string[]} props.block.pseudocode - Array of strings for code blocks
 * @param {string} props.block.algorithm - Algorithm name for visual blocks
 * @param {string} props.block.targetKey - Target key for visualizer
 * @param {string[]} props.block.images - Array of image paths for visual blocks
 * @param {number|string} props.activeCodeLine - Active line in pseudocode
 * @param {Function} props.onLineClick - Callback for line clicks
 * @param {Function} props.getImageUrl - Helper to resolve image URLs
 */
const LessonBlock = ({ 
  block, 
  activeCodeLine, 
  onLineClick, 
  getImageUrl 
}) => {
  if (!block) return null;

  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return (
          <div className={styles.textBlock}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {Array.isArray(block.content) ? block.content.join('\n') : (block.content || '')}
            </ReactMarkdown>
          </div>
        );

      case 'code':
        return (
          <div className={styles.codeBlock}>
            <PseudocodePane 
              pseudocode={block.pseudocode || []}
              activeLine={activeCodeLine}
              onLineClick={onLineClick}
            />
          </div>
        );

      case 'image':
        if (block.src) {
          return (
            <div className={styles.imageBlock}>
              <img 
                src={getImageUrl(block.src)} 
                alt={block.caption || 'Lecture Illustration'} 
                className={styles.blockImage}
              />
              {block.caption && <p className={styles.imageCaption}>{block.caption}</p>}
            </div>
          );
        }
        return null;

      case 'svg-diagram':
        return (
          <div 
            className={styles.svgBlock}
            dangerouslySetInnerHTML={{ __html: block.svgContent }}
          />
        );

      case 'visual':
        if (block.algorithm) {
          return (
            <div className={styles.visualBlock}>
              <AlgorithmVisualizer 
                algorithm={block.algorithm}
                targetKey={block.targetKey}
              />
            </div>
          );
        }
        return null;

      default:
        return (
          <div className={styles.unsupportedBlock}>
            Unsupported block type: {block.type}
          </div>
        );
    }
  };

  return (
    <div className={styles.lessonBlock}>
      {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}
      {renderContent()}
    </div>
  );
};

export default LessonBlock;
