/**
  Calculate number of kea encounters per total hours surveyed
 */
export const calculateEncounterRate = gridTileAnalysis =>
  Math.round((gridTileAnalysis.hours_with_kea / gridTileAnalysis.hours_total) * 100);
