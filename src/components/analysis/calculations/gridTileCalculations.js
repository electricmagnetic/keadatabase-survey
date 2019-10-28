/**
  Calculate number of kea encounters per total hours surveyed
 */
export const calculateEncounterRate = gridTileAnalysis =>
  Math.round((gridTileAnalysis.hours_total.with_kea / gridTileAnalysis.hours_total.total) * 100);
