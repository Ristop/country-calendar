import React from 'react';
import './CountryInfoCard.scss';

export interface CountryInfoCardProps {
  name: string;
  code: string;
  numOfVisits: number;
}

const CountryInfoCard = ({ name, code, numOfVisits }: CountryInfoCardProps) => {
  return (
    <div className={`country-info-card`}>
      <div className={'card-header'}>
        <div className={`flag fib fi-${code.toLowerCase()}`}></div>
        <div className={'name'}>{name}</div>
      </div>
      <div className={'card-body'}>
        {numOfVisits} {numOfVisits > 1 ? 'visits' : 'visit'}
      </div>
    </div>
  );
};

export default CountryInfoCard;
