import { v4 as uuidv4 } from 'uuid';
import { CountryInfo } from './types/CountryInfo';
import { CountriesByYear } from './types/CountriesByYear';
import countries, { Country } from 'world-countries';

export function getFirstVisited(selectedCountries: CountriesByYear): CountryInfo[] {
  return Object.values(selectedCountries).reduce((acc, entry: CountryInfo[]) => {
    for (const countryInfo of entry) {
      if (acc.some((c: CountryInfo) => c.name === countryInfo.name)) {
        continue;
      }
      acc.push(countryInfo);
    }
    return acc;
  }, []);
}

export function getCountriesFromParams(years: number[], searchParams: URLSearchParams): CountriesByYear {
  return years.reduce((acc: CountriesByYear, year) => {
    acc[year] = (searchParams.get(year.toString())?.match(/.{1,2}/g) || [])
      .map((code: string) => code.toUpperCase())
      .filter((code: string) => unMembers[code])
      .map((code: string) => ({
        name: unMembers[code].name,
        code: code,
        id: uuidv4().toString(),
      }));
    return acc;
  }, {});
}

export interface CountryMin {
  name: string;
}

export const unMembers: { [p: string]: CountryMin } = countries
  // @ts-ignore
  .filter((c: Country) => c.unMember)
  .reduce((acc: { [code: string]: CountryMin }, country) => {
    acc[country.cca2] = { name: country.name.common };
    return acc;
  }, {});
