import { Currency } from 'world-countries';

export interface CountryInfo {
  name: string;
  code: string;
  capital: string[];
  region: string;
  subRegion: string;
  currency: Currency;
}
