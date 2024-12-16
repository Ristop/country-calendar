import React, { useState } from 'react';
import './YearContainer.scss';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { CountryInfo } from '../../types/CountryInfo';
import CountryLabel from '../../components/CountryLabel';
import Button from '../../components/Button';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import YearField from './YearField';

export interface YearContainerProps {
  year: string;
  countries: CountryInfo[];
  firstVisited: CountryInfo[];
  isFirst?: boolean;
  setStartYear: (year: number) => void;
}

const YearContainer = ({ year, countries, firstVisited, isFirst = false, setStartYear }: YearContainerProps) => {
  const { setNodeRef } = useDroppable({ id: year });
  const [editButtonVisible, setEditButtonVisible] = useState(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [editedYear, setEditedYear] = useState<number>(Number(year));

  return (
    <div
      className='year-container'
      ref={setNodeRef}
      onMouseEnter={() => isFirst && setEditButtonVisible(true)}
      onMouseLeave={() => isFirst && setEditButtonVisible(false)}
    >
      <div className='year-info'>
        <div className='year text-monospace'>
          {editVisible ? (
            <YearField
              ariaLabel='year-field'
              value={editedYear.toString()}
              onChange={(val) => setEditedYear(Number(val))}
            />
          ) : (
            year
          )}
        </div>

        {isFirst && editButtonVisible && !editVisible && (
          <div className='edit'>
            <Button label={'Edit'} icon={faPencil} onClick={() => setEditVisible(true)} />
          </div>
        )}
        {isFirst && editVisible && (
          <div className='edit'>
            <Button
              label={'Confirm'}
              onClick={() => {
                setStartYear(editedYear);
                setEditVisible(false);
              }}
            />
          </div>
        )}
        {countries.length !== 0 && (
          <div className='counter text-monospace'>
            <span className='success'>{countries.filter((c) => firstVisited.includes(c)).length + ' '}</span>
            <span className='secondary'>{countries.length}</span>
          </div>
        )}
      </div>
      <div className='year-countries'>
        <SortableContext id={year} items={countries.map((c) => c.id)}>
          {countries.map((country) => (
            <CountryLabel
              key={country.id.toString()}
              country={country}
              variant={firstVisited.includes(country) ? 'primary' : 'secondary'}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default YearContainer;
