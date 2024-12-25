import React from 'react';
import './Summary.scss';
import CountryLabel from '../../components/CountryLabel';
import { CountryInfo } from '../../types/CountryInfo';
import { setCountryState } from '../../counterSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

export interface YearContainerProps {
  firstVisited: CountryInfo[];
}

const Summary = ({ firstVisited }: YearContainerProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={`summary`}>
      <div className="summary-element text-monospace">
        <div className="metric">{firstVisited.length}</div>
        <div className="description">Countries visited</div>
      </div>
      <div className="all-visited-countries">
        {firstVisited.map((country) => (
          <CountryLabel
            key={country.id}
            country={country} variant="primary"
            onMouseEnter={() => dispatch(setCountryState(country))}
            onMouseLeave={() => dispatch(setCountryState(undefined))}
          />
        ))}
      </div>
    </div>
  );
};

export default Summary;
