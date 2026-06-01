import { useState, useCallback } from 'react'

/**
 * Hook to manage the synchronized state between pseudocode and visuals.
 * 
 * @param {number} initialSlide - The starting slide index.
 * @returns {Object} State and handlers for lecture synchronization.
 */
export default function useLectureSync(initialSlide = 0) {
  const [activeCodeLine, setActiveCodeLine] = useState(null)
  const [activeSlide, setActiveSlide] = useState(initialSlide)
  const [splitPosition, setSplitPosition] = useState(40)

  const handleLineClick = useCallback((lineId) => {
    setActiveCodeLine(lineId)
  }, [])

  const handleSlideChange = useCallback((slideIndex) => {
    setActiveSlide(slideIndex)
  }, [])

  const handleSplitResize = useCallback((newPosition) => {
    setSplitPosition(newPosition)
  }, [])

  return {
    activeCodeLine,
    activeSlide,
    splitPosition,
    handleLineClick,
    handleSlideChange,
    handleSplitResize,
    setActiveCodeLine,
    setActiveSlide,
    setSplitPosition
  }
}
