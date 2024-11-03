import React, { useRef, useState } from 'react';
import './TimeLine.scss';
import { CountryInfo, CountriesByYear } from './App';
import YearContainer from './YearContainer';

export interface YearContainerProps {
  years: number[];
  countries: CountriesByYear;
  firstVisited: CountryInfo[];
}

function getNumOfColumns(element: Element | null) {
  if (element) {
    return window.getComputedStyle(element).getPropertyValue('grid-template-columns').split(' ').length;
  } else {
    return 0;
  }
}

const TimeLine = ({ years, countries, firstVisited }: YearContainerProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [extraCells, setExtraCells] = useState<number>(0);

  window.addEventListener('resize', () => {
    const columns = getNumOfColumns(ref.current);
    const lastRow = years.length % columns;

    if (lastRow === 0) {
      setExtraCells(0);
    } else {
      setExtraCells(columns - lastRow);
    }
  });

  window.addEventListener('load', () => {
    const columns = getNumOfColumns(ref.current);
    const lastRow = years.length % columns;

    if (lastRow === 0) {
      setExtraCells(0);
    } else {
      setExtraCells(columns - lastRow);
    }
  });

  return (
    <div className='timeline' ref={ref}>
      {years.map((year) => (
        <YearContainer key={year} year={year.toString()} countries={countries[year]} firstVisited={firstVisited} />
      ))}
      {Array.from({ length: extraCells }).map((_, index) => (
        <div key={index} className='empty-cell'></div>
      ))}
    </div>
  );
};

export default TimeLine;
