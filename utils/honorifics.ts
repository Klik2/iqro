
export const formatHonorifics = (text: string): string => {
  if (!text) return text;
  
  // Rule 1: Replace common abbreviations with full honorifics
  let formatted = text
    // Allah
    .replace(/\bSWT\b/g, 'Subhanahu wa Ta\'ala')
    // Muhammad
    .replace(/\bSAW\b/g, 'Shallallahu ‘Alaihi wa Sallam')
    // Prophets
    .replace(/\bAS\b/g, 'Alaihis-salam')
    // Sahabat variations
    .replace(/\bRA\b/g, 'Radhiyallahu ‘anhu');

  // Case insensitive variants often found in translation text
  formatted = formatted
    .replace(/\bswt\b/gi, 'Subhanahu wa Ta\'ala')
    .replace(/\bsaw\b/gi, 'Shallallahu ‘Alaihi wa Sallam')
    .replace(/\bas\b/gi, 'Alaihis-salam')
    .replace(/\bra\b/gi, 'Radhiyallahu ‘anhu');

  return formatted;
};
