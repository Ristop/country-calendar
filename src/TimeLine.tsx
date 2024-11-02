import React from 'react';
import './TimeLine.scss';
import { CountryInfo, CountriesByYear } from './App';
import YearContainer from './YearContainer';

export interface YearContainerProps {
  years: number[];
  countries: CountriesByYear;
  firstVisited: CountryInfo[];
}

const TimeLine = ({ years, countries, firstVisited }: YearContainerProps) => {
  return (
    <div className='timeline'>
      {years.map((year) => (
        <YearContainer key={year} year={year} countries={countries[year]} firstVisited={firstVisited} />
      ))}
    </div>
  );
};

export default TimeLine;
