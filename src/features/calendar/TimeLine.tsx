import React, { useEffect, useRef, useState } from 'react';
import './TimeLine.scss';
import YearContainer from './YearContainer';
import { CountryInfo } from '../../types/CountryInfo';
import { CountriesByYear } from '../../types/CountriesByYear';

export interface YearContainerProps {
  countries: CountriesByYear;
  firstVisited: CountryInfo[];
  setStartYear: (year: number) => void;
}

function getNumOfColumns(element: Element | null) {
  if (element) {
    return window.getComputedStyle(element).getPropertyValue('grid-template-columns').split(' ').length;
  } else {
    return 0;
  }
}

function getNumberOfExtraCells(ref: any, years: number[]) {
  const columns = getNumOfColumns(ref.current);
  const lastRow = years.length % columns;

  if (lastRow === 0) {
    return 0;
  } else {
    return columns - lastRow;
  }
}

const TimeLine = ({ countries, firstVisited, setStartYear }: YearContainerProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [extraCells, setExtraCells] = useState<number>(0);

  const years = Object.keys(countries).map((year) => Number(year));

  window.addEventListener('resize', () => {
    setExtraCells(getNumberOfExtraCells(ref, years));
  });

  window.addEventListener('load', () => {
    setExtraCells(getNumberOfExtraCells(ref, years));
  });

  useEffect(() => {
    setExtraCells(getNumberOfExtraCells(ref, years));
  }, [ref, years]);

  return (
    <div className='timeline' ref={ref}>
      {years.map((year) => (
        <YearContainer
          key={year}
          year={year.toString()}
          countries={countries[year] || []}
          firstVisited={firstVisited}
          isFirst={years[0] === year}
          setStartYear={setStartYear}
        />
      ))}
      {Array.from({ length: extraCells }).map((_, index) => (
        <div key={index} className='empty-cell'></div>
      ))}
    </div>
  );
};

export default TimeLine;
