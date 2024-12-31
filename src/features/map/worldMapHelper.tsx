import { VisitedCountry } from '../../types/VisitedCountry';

const MAX_NUM_OF_COLORS = 10; // max darkness at 10 visits
const BASE_COLOR = { r: 171, g: 200, b: 219 }; // #93acbc
const NO_COLOR = '#D6D6DA';
const HOME_COUNTRY_COLOR = '#75c17c';
const HIGHLIGHTED_COLOR = '#93acbc';
const HIGHLIGHTED_AND_VISITED_COLOR = '#12263f';

export const getCountryColor = (visitCount: number, maxVisits: number, isHomeCountry: boolean, highlighted: boolean, highlightActive: boolean): string => {
  if (highlightActive) {
    if (highlighted) {
      return visitCount > 0 ? HIGHLIGHTED_AND_VISITED_COLOR : HIGHLIGHTED_COLOR;
    } else {
      return NO_COLOR;
    }
  }

  if (isHomeCountry) {
    return HOME_COUNTRY_COLOR;
  }

  if (visitCount === 0) {
    return NO_COLOR;
  }

  const numOfColors = maxVisits > 10 ? MAX_NUM_OF_COLORS : maxVisits;
  const darkenFactor = Math.min(visitCount, numOfColors) / numOfColors;

  const r = Math.floor(BASE_COLOR.r * (1 - darkenFactor * 0.7));
  const g = Math.floor(BASE_COLOR.g * (1 - darkenFactor * 0.7));
  const b = Math.floor(BASE_COLOR.b * (1 - darkenFactor * 0.7));

  return `rgb(${r}, ${g}, ${b})`;
};

export function getVisitCounts(selectedCountries: { [p: string]: VisitedCountry[] }) {
  return Object.values(selectedCountries)
    .flat()
    .reduce(
      (acc, country) => {
        acc[country.alpha3] = (acc[country.alpha3] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number },
    );
}
