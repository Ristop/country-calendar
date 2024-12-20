import React, { useMemo, useState } from 'react';
import './CountriesSearch.scss';
import { countries } from 'countries-list';
import { v4 as uuidv4 } from 'uuid';
import SearchField from './SearchField';
import CountryLabel from '../../components/CountryLabel';

const CountriesSearch = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);

  const searchResults = Object.entries(countries).filter(
    ([, country]) => search && country.name.toLowerCase().includes(search.toLowerCase())
  );

  const results = useMemo(() => {
    return searchResults.map(([code, country]) =>
      (
        <CountryLabel
          key={country.name}
          country={{
            name: country.name,
            code: code,
            id: `new_${uuidv4().toString()}`,
          }}
          variant='primary'
        />
      ))
  }, [search]);

  return <div className='countries-search'>
      <SearchField
        placeholder='Search'
        onChange={(search) => setSearch(search)}
        ariaLabel='Search'
      />
      <div className='search-countries'>
        {results}
      </div>
  </div>;
};

export default CountriesSearch;
