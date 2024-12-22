import React from 'react';
import './Summary.scss';
import CountryLabel from '../../components/CountryLabel';
import { CountryInfo } from '../../types/CountryInfo';

export interface YearContainerProps {
  firstVisited: CountryInfo[];
  dragInProcess: boolean;
}

const Summary = ({ firstVisited, dragInProcess }: YearContainerProps) => {
  return (
    <div className={`summary ${dragInProcess ? 'drag-in-progress' : ''}`}>
      <div className='summary-element text-monospace'>
        <div className='metric'>{firstVisited.length}</div>
        <div className='description'>Countries visited</div>
      </div>
      <div className='all-visited-countries'>
        {firstVisited.map((country) => (
          <CountryLabel key={country.id} country={country} variant='primary' grabbable={false} />
        ))}
      </div>
    </div>
  );
};

export default Summary;
