import React from 'react';
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
      className="year-container flex flex-col p-2 min-w-72 md:min-h-24 main-bg"
      ref={setNodeRef}
    >
      <div className="year-info flex mb-2">
        <div className="year font-mono text-xl font-bold">
          {year}
        </div>
        {countries.length !== 0 && (
          <div className="counter font-mono ml-auto text-xl font-bold">
            <span className="text-base-blue">{countries.filter((c) => firstVisited.includes(c)).length + ' '}</span>
            <span className="text-secondary">{countries.length}</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-start gap-2">
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
