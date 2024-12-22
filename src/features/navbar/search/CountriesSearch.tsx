import React, { useMemo, useState } from 'react';
import './CountriesSearch.scss';
import { countries } from 'countries-list';
import { v4 as uuidv4 } from 'uuid';
import SearchField from './SearchField';
import DraggableCountryLabel from './DraggableCountryLabel';

export interface CountriesSearchProps {
  dragInProgress: boolean;
  regenKey: number;
}

const CountriesSearch = ({ dragInProgress, regenKey }: CountriesSearchProps) => {
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

  return <div className='countries-search'>
      <SearchField
        placeholder='Search'
        onChange={(search: string) => setSearch(search)}
        ariaLabel='Search'
      />
      <div className={'search-results' + (dragInProgress ? ' hidden' : '')}>
        {results}
      </div>
  </div>;
};

export default CountriesSearch;
