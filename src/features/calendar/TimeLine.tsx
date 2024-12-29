import React, { useEffect, useRef, useState } from 'react';
import YearContainer from './YearContainer';
import { VisitedCountriesByYear, VisitedCountry } from '../../types/VisitedCountry';
import EmptyYearContainer from './EmptyYearContainer';

interface YearContainerProps {
  countries: VisitedCountriesByYear;
  firstVisited: VisitedCountry[];
}

const TimeLine = ({ countries, firstVisited }: YearContainerProps) => {
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
    <div className="" id="calendar">
      <div className="grid gap-px grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] bg-main-border mx-auto mb-2"
           ref={ref}>
        {years.map((year) => (
          <YearContainer
            key={year}
            year={year.toString()}
            countries={countries[year] || []}
            firstVisited={firstVisited}
            isFirst={years[0] === year}
          />
        ))}
        {Array.from({ length: extraCells }).map((_, index) => (
          <EmptyYearContainer key={`empty_${index}`} />
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
