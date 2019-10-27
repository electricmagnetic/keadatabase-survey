/**
  Calculate number of kea encounters per total hours surveyed
 */
export const calculateEncounterRate = surveyAnalysis =>
  Math.round((surveyAnalysis.hours_with_kea / surveyAnalysis.hours_surveyed) * 100);
