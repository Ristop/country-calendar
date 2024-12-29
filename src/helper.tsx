import { v4 as uuidv4 } from 'uuid';
import { VisitedCountriesByYear, VisitedCountry } from './types/VisitedCountry';
import countries, { Country } from 'world-countries';
import { CountryInfo } from './types/CountryInfo';

export function getFirstVisited(selectedCountries: VisitedCountriesByYear): VisitedCountry[] {
  return Object.values(selectedCountries).reduce((acc, entry: VisitedCountry[]) => {
    for (const countryInfo of entry) {
      if (!acc.some((c: VisitedCountry) => c.name === countryInfo.name)) {
        acc.push(countryInfo);
      }
    }
    return acc;
  }, []);
}

export function getCountriesFromParams(years: number[], searchParams: URLSearchParams): VisitedCountriesByYear {
  return years.reduce((acc: VisitedCountriesByYear, year) => {
    acc[year] = (searchParams.get(year.toString())?.match(/.{1,2}/g) || [])
      .map((code: string) => code.toUpperCase())
      .filter((code: string) => unMembers[code])
      .map((code: string) => ({
        ...unMembers[code],
        id: uuidv4().toString(),
      }));
    return acc;
  }, {});
}

export const unMembers: { [p: string]: CountryInfo } = countries
  // @ts-ignore
  .filter((c: Country) => c.unMember)
  .reduce((acc: { [code: string]: CountryInfo }, country) => {
    acc[country.cca2] = {
      name: country.name.common,
      code: country.cca2,
      capital: country.capital,
      region: country.region,
      subRegion: country.subregion,
      currency: Object.values(country.currencies)[0],
    };
    return acc;
  }, {});

export const regions = Object.values(unMembers).reduce((acc: { [region: string]: number }, country) => {
  acc[country.region] = (acc[country.region] || 0) + 1;
  return acc;
}, {});
