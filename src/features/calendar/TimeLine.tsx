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

const TimeLine = ({ countries, firstVisited, setStartYear }: YearContainerProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [extraCells, setExtraCells] = useState<number>(0);

  const years = Object.keys(countries).map((year) => Number(year));

  useEffect(() => {
    const calculateExtraCells = () => {
      if (!ref.current) return;

      const grid = ref.current;
      const columns = window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      const rows = Math.ceil(Object.keys(countries).length / columns);
      const totalCells = rows * columns;
      const emptyCells = totalCells - Object.keys(countries).length;

      setExtraCells(emptyCells);
    };

    const resizeObserver = new ResizeObserver(calculateExtraCells);
    if (ref.current) resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [countries]);

  return (
    <div className='timeline' id='calendar' ref={ref}>
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
