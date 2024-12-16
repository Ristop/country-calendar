import React, { useMemo, useState } from 'react';
import './CountriesSearch.scss';
import { countries } from 'countries-list';
import { v4 as uuidv4 } from 'uuid';
import SearchField from './SearchField';
import CountryLabel from '../../components/CountryLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const CountriesSearch = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [show, setShow] = useState<boolean>(false)
  const [buttonVisible, setButtonVisible] = useState<boolean>(false)

  const searchResults = Object.entries(countries).filter(
    ([, country]) => search && country.name.toLowerCase().includes(search.toLowerCase())
  );

  const results = useMemo(() => {
    if (searchResults.length > 4) {
      return
    }
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

  return <div className='countries-search'
       onMouseEnter={() => setButtonVisible(true)}
       onMouseLeave={() => setButtonVisible(false)}
  >
    {show ?
      <div className={'search-action'}>
        <FontAwesomeIcon icon={faMinusCircle} className='icon' onClick={() => setShow(!show)} />
      </div> :
      <div className={'search-action ' + (!buttonVisible ? 'hidden' : '')}>
        <FontAwesomeIcon icon={faPlusCircle} className={'icon'} onClick={() => setShow(!show)} />
        Add more
      </div>}
    {show && <>
        <SearchField
          placeholder='Search'
          onChange={(search) => setSearch(search)}
          ariaLabel='Search'
        />
        <div className='search-countries'>
          {results}
        </div>
      </>}
  </div>;
};

export default CountriesSearch;
