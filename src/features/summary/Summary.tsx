import React from 'react';
import './Summary.scss';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import CountryLabel from '../../components/CountryLabel';
import { CountryInfo } from '../../types/CountryInfo';

export interface YearContainerProps {
  firstVisited: CountryInfo[];
  id: UniqueIdentifier;
  dragInProcess: boolean;
}

const Summary = ({ firstVisited, id, dragInProcess }: YearContainerProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`summary text-monospace ${dragInProcess ? 'drag-in-progress' : ''}`}>
      {dragInProcess && (
        <div className='trash-wrapper'>
          <div className={`trash-overlay ${isOver ? 'over' : ''}`}>
            <div className='text'>Drop here to remove</div>
          </div>
        </div>
      )}
      <div className='summary-element'>
        <div className='metric'>{firstVisited.length}</div>
        <div className='description'>Countries visited</div>
      </div>
      <div className='all-visited-countries'>
        {firstVisited.map((country) => (
          <CountryLabel key={country.id} country={country} variant='success' grabbable={false} />
        ))}
      </div>
    </div>
  );
};

export default Summary;
