import React, { useMemo, useState } from 'react';
import { countries } from 'countries-list';
import { v4 as uuidv4 } from 'uuid';
import TextField from '../../../components/TextField';
import DraggableCountryLabel from './DraggableCountryLabel';

export interface CountriesSearchProps {
  regenKey: number;
}

const CountriesSearch = ({ regenKey }: CountriesSearchProps) => {
  const [search, setSearch] = useState<string | undefined>(undefined);

  const searchResults = Object.entries(countries).filter(
    ([, country]) => search && country.name.toLowerCase().includes(search.toLowerCase())
  );

  const results = useMemo(() => {
    return searchResults.map(([code, country]) =>
      (
        <DraggableCountryLabel
          key={country.name}
          country={{
            name: country.name,
            code: code,
            id: `new_${uuidv4().toString()}`,
          }}
          variant='primary'
        />
      ))
  }, [search, regenKey]);

  return <div className='flex flex-col gap-4 mx-2 flex-1 overflow-hidden pb-4'>
      <TextField
        placeholder='Search'
        onChange={(search: string) => setSearch(search)}
        ariaLabel='Search'
      />
      <div className='flex flex-col gap-2 overflow-x-hidden pr-1 scrollbar-custom'>
        {results}
      </div>
  </div>;
};

export default CountriesSearch;
