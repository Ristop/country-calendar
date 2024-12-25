import React from 'react';
import './YearContainer.scss';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { CountryInfo } from '../../types/CountryInfo';
import SortableCountryLabel from './SortableCountryLabel';

export interface YearContainerProps {
  year: string;
  countries: CountryInfo[];
  firstVisited: CountryInfo[];
  isFirst?: boolean;
}

const YearContainer = ({ year, countries, firstVisited, isFirst = false }: YearContainerProps) => {
  const { setNodeRef } = useDroppable({ id: year });

  return (
    <div
      className="year-container"
      ref={setNodeRef}
    >
      <div className="year-info">
        <div className="year text-monospace">
          {year}
        </div>
        {countries.length !== 0 && (
          <div className="counter text-monospace">
            <span className="success">{countries.filter((c) => firstVisited.includes(c)).length + ' '}</span>
            <span className="secondary">{countries.length}</span>
          </div>
        )}
      </div>
      <div className="year-countries">
        <SortableContext id={year} items={countries.map((c) => c.id)}>
          {countries.map((country, i) => (
            <SortableCountryLabel
              key={country.id.toString()}
              country={country}
              variant={(i === 0 && isFirst) ? 'success' : (firstVisited.includes(country) ? 'primary' : 'secondary')}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default YearContainer;
