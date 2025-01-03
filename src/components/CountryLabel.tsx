import React from 'react';
import { VisitedCountry } from '../types/VisitedCountry';
import Flag from './Flag';

export interface CountryLabelProps {
  country: VisitedCountry;
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

const CountryLabel = (
  {
    country,
    className = '',
    variant = 'primary',
    onMouseEnter,
    onMouseLeave,
  }: CountryLabelProps) => {
  return (
    <div
      className={`flex items-center justify-between text-sm rounded p-1 ${variants[variant]} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Flag code={country.alpha2.toLowerCase()} />
      <div className={`pl-1 whitespace-normal overflow-hidden`}>{country.name}</div>
    </div>
  );
};

export default CountryLabel;
