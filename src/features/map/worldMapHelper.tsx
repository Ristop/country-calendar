import { CountryInfo } from '../../types/CountryInfo';

export const getVisitColor = (visitCount: number): string => {
  // Base color: #28536b
  const baseColor = { r: 55, g: 85, b: 108 };

  // Darken the color based on visit count (max darkness at 5 visits)
  const darkenFactor = Math.min(visitCount, 5) / 5;

  const r = Math.floor(baseColor.r * (1 - darkenFactor * 0.7));
  const g = Math.floor(baseColor.g * (1 - darkenFactor * 0.7));
  const b = Math.floor(baseColor.b * (1 - darkenFactor * 0.7));

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
