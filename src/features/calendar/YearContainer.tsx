import React from 'react';
import './YearContainer.scss';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { CountryInfo } from '../../types/CountryInfo';
import CountryLabel from '../../components/CountryLabel';

export interface YearContainerProps {
  year: string;
  countries: CountryInfo[];
  firstVisited: CountryInfo[];
}

const YearContainer = ({ year, countries, firstVisited }: YearContainerProps) => {
  const { setNodeRef } = useDroppable({ id: year });

  return (
    <SortableContext id={year} items={countries.map((c) => c.id)}>
      <div className='year-container' ref={setNodeRef}>
        <div className='year-info'>
          <div className='year text-monospace'>{year}</div>
          {countries.length !== 0 && (
            <div className='counter text-monospace'>
              <span className='success'>{countries.filter((c) => firstVisited.includes(c)).length + ' '}</span>
              <span className='secondary'>{countries.length}</span>
            </div>
          )}
        </div>
        <div className='year-countries'>
          {countries.map((country) => (
            <CountryLabel
              key={country.id.toString()}
              country={country}
              variant={firstVisited.includes(country) ? 'success' : 'secondary'}
            />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default YearContainer;
