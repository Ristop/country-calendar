import React, { useState } from 'react';
import './CountriesSearch.scss';
import CountryLabel from './CountryLabel';
import SearchField, { Size } from './SearchField';
import { countries } from 'countries-list';
import { v4 as uuidv4 } from 'uuid';

const CountriesSearch = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);

  const searchResults = Object.entries(countries).filter(
    ([, country]) => search && country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='countries-search'>
      <div className='search'>
        <SearchField
          placeholder='Add more'
          size={Size.MEDIUM}
          onChange={(search) => setSearch(search)}
          ariaLabel={'Search countries'}
        />
      </div>
      {searchResults.length !== 0 && (
        <div className='search-countries'>
          {searchResults.map(([code, country]) => (
            <CountryLabel
              key={country.name}
              country={{
                name: country.name,
                code: code,
                id: uuidv4().toString(),
              }}
              variant='primary'
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountriesSearch;
