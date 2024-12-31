import { Currency } from 'world-countries';

export interface CountryInfo {
  name: string;
  alpha2: string;
  alpha3: string;
  capital: string[];
  region: string;
  subRegion: string;
  currency: Currency;
}
