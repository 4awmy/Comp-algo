import { useState, useEffect, useCallback } from 'react';
import styles from './SplitPane.module.css';

const ResizeHandle = ({ onResizeStart, onResizeEnd, className, style }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    onResizeStart();
  }, [onResizeStart]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onResizeEnd();
      }
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onResizeEnd]);

  return (
    <div
      className={`${styles.resizer} ${className || ''}`}
      onMouseDown={handleMouseDown}
      style={style}
    />
  );
};

export default ResizeHandle;
