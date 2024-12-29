import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { VisitedCountry } from '../../types/VisitedCountry';
import SortableCountryLabel from './SortableCountryLabel';

interface YearContainerProps {
  year: string;
  countries: VisitedCountry[];
  firstVisited: VisitedCountry[];
  isFirst?: boolean;
}

const YearContainer = ({ year, countries, firstVisited, isFirst = false }: YearContainerProps) => {
  const { setNodeRef } = useDroppable({ id: year });

  return (
    <div
      className="flex flex-col p-2 min-w-72 md:min-h-24 main-bg"
      ref={setNodeRef}
    >
      <div className="flex mb-2">
        <div className="font-mono text-xl font-bold">
          {year}
        </div>
        {countries.length !== 0 && (
          <div className="font-mono ml-auto text-xl font-bold">
            <span className="text-secondary">{countries.length}</span>
            <span className="text-base-blue ml-2">{countries.filter((c) => firstVisited.includes(c)).length}</span>
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
