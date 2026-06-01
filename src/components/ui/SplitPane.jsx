import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './SplitPane.module.css';
import ResizeHandle from './ResizeHandle';

const SplitPane = ({ leftPane, rightPane, position, onPositionChange }) => {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  const handleResizeStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;

    // Constrain position between 20% and 80%
    const constrainedPosition = Math.min(Math.max(newPosition, 20), 80);
    onPositionChange(constrainedPosition);
  }, [isResizing, onPositionChange]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleResizeEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, handleMouseMove, handleResizeEnd]);

  return (
    <div 
      ref={containerRef} 
      className={`${styles.container} ${isResizing ? styles.resizing : ''}`}
    >
      <div 
        className={`${styles.pane} ${styles.leftPane}`} 
        style={{ width: `${position}%` }}
      >
        {leftPane}
      </div>
      
      <ResizeHandle 
        onResizeStart={handleResizeStart} 
        onResizeEnd={handleResizeEnd}
        style={{ left: `${position}%` }}
      />

      <div className={`${styles.pane} ${styles.rightPane}`}>
        {rightPane}
      </div>
    </div>
  );
};

export default SplitPane;
