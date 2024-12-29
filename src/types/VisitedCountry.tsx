import { CountryInfo } from './CountryInfo';

export interface VisitedCountry extends CountryInfo {
  id: string;
}

export interface VisitedCountriesByYear {
  [year: string]: VisitedCountry[];
}
