import { v4 as uuidv4 } from 'uuid';
import { countries, ICountry } from 'countries-list';
import { CountryInfo, CountriesByYear } from './App';

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
      .filter((code: string) => countriesMap[code])
      .map((code: string) => ({
        name: countriesMap[code].name,
        code: code,
        id: uuidv4().toString(),
      }));
    return acc;
  }, {});
}

export const countriesMap = Object.entries(countries).reduce((acc: { [code: string]: ICountry }, [code, country]) => {
  acc[code] = country;
  return acc;
}, {});
