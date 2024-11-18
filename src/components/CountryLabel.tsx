import React from 'react';
import './CountryLabel.scss';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CountryInfo } from '../types/CountryInfo';

export interface CountryLabelProps {
  country: CountryInfo;
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success';
  onRemove?: () => void;
  className?: string;
  grabbable?: boolean;
}

const CountryLabel = ({ country, className = '', variant = 'primary', grabbable = true }: CountryLabelProps) => {
  if (grabbable) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: country.id,
      data: { name: country.name, code: country.code },
    });

    return (
      <div
        ref={grabbable ? setNodeRef : null}
        className={`label grabbable ${variant} ${className}`}
        {...listeners}
        {...attributes}
        style={{
          transform: CSS.Translate.toString(transform),
          transition: transition,
        }}
      >
        <div className={`flag fib fi-${country.code.toLowerCase()}`}></div>
        <div className='text'>{country.name}</div>
      </div>
    );
  } else {
    return (
      <div className={`label ${variant} ${className}`}>
        <div className={`flag fib fi-${country.code.toLowerCase()}`}></div>
        <div className='text'>{country.name}</div>
      </div>
    );
  }
};

export default CountryLabel;
