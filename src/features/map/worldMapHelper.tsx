import { CountryInfo } from '../../types/CountryInfo';

const MAX_NUM_OF_COLORS = 10; // max darkness at 10 visits
const BASE_COLOR = { r: 171, g: 200, b: 219 }

export const getVisitColor = (visitCount: number, maxVisits: number): string => {
  const numOfColors = maxVisits > 10 ? MAX_NUM_OF_COLORS : maxVisits;
  const darkenFactor = Math.min(visitCount, numOfColors) / numOfColors;

  const r = Math.floor(BASE_COLOR.r * (1 - darkenFactor * 0.7));
  const g = Math.floor(BASE_COLOR.g * (1 - darkenFactor * 0.7));
  const b = Math.floor(BASE_COLOR.b * (1 - darkenFactor * 0.7));

  return `rgb(${r}, ${g}, ${b})`;
};

export function getVisitCounts(selectedCountries: { [p: string]: CountryInfo[] }) {
  return Object.values(selectedCountries)
    .flat()
    .reduce(
      (acc, country) => {
        acc[country.code] = (acc[country.code] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number }
    );
}
