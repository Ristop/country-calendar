import React from 'react';
import CountryLabel from '../../components/CountryLabel';
import { VisitedCountry } from '../../types/VisitedCountry';
import { setCountryState } from '../../store/slices/infoCardSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import Metric from './Metric';
import { unMembers } from '../../helper';

interface SummaryProps {
  firstVisited: VisitedCountry[];
}

const Summary = ({ firstVisited }: SummaryProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <div className="flex-col md:flex-row flex gap-3 mx-auto">
        <Metric metric={firstVisited.length} total={Object.keys(unMembers).length} description={'Countries visited'} size={'large'} />
        <div className="flex flex-wrap gap-2 justify-start mt-auto p-2">
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
    </div>
  );
};

export default Summary;
