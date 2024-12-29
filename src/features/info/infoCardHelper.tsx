import { CountryInfo } from '../../types/CountryInfo';
import { VisitedCountriesByYear } from '../../types/VisitedCountry';

export function getNumberOfVisits(country: CountryInfo, allCountries: VisitedCountriesByYear): number {
  return Object.values(allCountries)
    .flat()
    .filter((c) => c.code === country.code).length;
}

export function getFirstVisit(country: CountryInfo, allCountries: VisitedCountriesByYear): string {
  return Object.entries(allCountries).find(([, countries]) =>
    countries.some((c) => c.code === country.code),
  )?.[0] || '';
}

export function getLastVisit(country: CountryInfo, allCountries: VisitedCountriesByYear): string {
  return Object.entries(allCountries).findLast(([, countries]) =>
    countries.some((c) => c.code === country.code),
  )?.[0] || '';
}
