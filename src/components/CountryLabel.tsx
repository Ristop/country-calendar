import React from 'react';
import { CountryInfo } from '../types/CountryInfo';

export interface CountryLabelProps {
  country: CountryInfo;
  variant?: 'secondary' | 'primary' | 'success';
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const variants = {
  primary: 'label-primary',
  secondary: 'label-secondary',
  success: 'label-success',
};

const CountryLabel = ({ country, className = '', variant = 'primary', onMouseEnter, onMouseLeave }: CountryLabelProps) => {
  return (
    <div
      className={`flex items-center justify-between text-sm rounded p-1 ${variants[variant]} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`w-6 min-w-6 h-[18px] rounded fib fi-${country.code.toLowerCase()}`}></div>
      <div className={`pl-1 whitespace-normal overflow-hidden`}>{country.name}</div>
    </div>
  );
};

export default CountryLabel;
