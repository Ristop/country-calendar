import React from 'react';
import './CountryLabel.scss';
import { CountryInfo } from '../types/CountryInfo';

export interface CountryLabelProps {
  country: CountryInfo;
  variant?: 'secondary' | 'primary' | 'success';
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const CountryLabel = ({ country, className = '', variant = 'primary', onMouseEnter, onMouseLeave }: CountryLabelProps) => {

  return (
    <div className={`label ${variant} ${className}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className={`flag fib fi-${country.code.toLowerCase()}`}></div>
      <div className='text'>{country.name}</div>
    </div>
  );
};

export default CountryLabel;
