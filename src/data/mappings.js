/**
 * Maps lecture pseudocode lines to visual assets (slides or visualizers).
 * 
 * Each lecture ID contains a 'codeToVisual' object where keys are line IDs
 * from the pseudocode and values are the corresponding visual asset.
 */
export const LECTURE_MAPPINGS = {
  '01': { codeToVisual: {} },
  '02': { codeToVisual: {} },
  '03': { codeToVisual: {} },
  '04': {
    // Example: line 1 of pseudocode maps to slide 4
    codeToVisual: {
      1: { type: 'slide', id: 4 },
      4: { type: 'visualizer', algorithm: 'bubbleSort', step: 0 }
    }
  },
  '05': { codeToVisual: {} },
  '06': { codeToVisual: {} },
  '07': { codeToVisual: {} },
  '09': { codeToVisual: {} },
  '10': { codeToVisual: {} },
  '11': { codeToVisual: {} },
  '13': { codeToVisual: {} }
};
