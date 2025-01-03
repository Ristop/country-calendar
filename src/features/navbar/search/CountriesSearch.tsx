import React, { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '../../../components/TextField';
import DraggableCountryLabel from './DraggableCountryLabel';
import { unMembers } from '../../../helper';

interface CountriesSearchProps {
  regenKey: number;
}

const CountriesSearch = ({ regenKey }: CountriesSearchProps) => {
  const [search, setSearch] = useState<string | undefined>(undefined);

  const searchResults = Object.entries(unMembers).filter(
    ([, country]) => search && country.name.toLowerCase().includes(search.toLowerCase())
  );

  const results = useMemo(() => {
    return searchResults.map(([code, country]) =>
      (
        <DraggableCountryLabel
          key={country.name}
          country={{ ...unMembers[code], id: `new_${uuidv4().toString()}` }}
          variant='primary'
        />
      ))
  }, [search, regenKey]);

  return <div className='flex flex-col gap-4 md:mx-2 flex-1 overflow-hidden pb-4'>
      <TextField
        placeholder='Search'
        onChange={(search: string) => setSearch(search)}
        ariaLabel='Search'
      />
      <div className='flex flex-row flex-wrap gap-2 overflow-x-hidden pr-1 scrollbar-custom'>
        {results}
      </div>
  </div>;
};

export default CountriesSearch;
