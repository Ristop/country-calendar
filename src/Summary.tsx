import React from 'react';
import './Summary.scss';
import { CountryInfo } from './App';
import CountryLabel from './CountryLabel';

export interface YearContainerProps {
  firstVisited: CountryInfo[];
}

const Summary = ({ firstVisited }: YearContainerProps) => {
  return (
    <div className='summary text-monospace'>
      <div className='summary-element'>
        <div className='metric'>{firstVisited.length}</div>
        <div className='description'>Countries visited</div>
      </div>
      <div className='all-visited-countries'>
        {firstVisited.map((country) => (
          <CountryLabel key={country.id} country={country} variant='success' />
        ))}
      </div>
    </div>
  );
};

export default Summary;
