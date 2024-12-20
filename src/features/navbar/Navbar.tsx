import React from 'react';
import "./Navbar.scss"
// @ts-ignore
import logo from '../../assets/img/logo/pp-logo.svg';
import { faPlusCircle, faArrowLeft, faCalendarDays, faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../header/Header';
import CountriesSearch from '../search/CountriesSearch';
import { Link } from 'react-scroll';

export interface NavbarProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

const Navbar = ({ expanded, setExpanded }: NavbarProps) => {
  return <nav className={'navbar ' + (expanded ? ' expanded' : '')}>
    {
      expanded ? (<Header/>) : (<div className='logo-only'>
        <img src={logo} alt='Logo' />
      </div>)
    }

    {!expanded && <div className='menu-item'>
      <FontAwesomeIcon icon={faPlusCircle} className={'icon'} onClick={() => setExpanded(!expanded)} />
    </div>}

    {!expanded && <div className='menu-item'>
      <Link to="calendar" smooth={true} duration={250}>
        <FontAwesomeIcon icon={faCalendarDays} className={'icon'} />
      </Link>
    </div>}

    {!expanded && <div className='menu-item'>
      <Link to="world-map" smooth={true} duration={250}>
        <FontAwesomeIcon icon={faMap} className={'icon'} />
      </Link>
    </div>}

    {expanded && <CountriesSearch />}

    {expanded && <div className='close'>
      <FontAwesomeIcon icon={faArrowLeft} className={'icon'} onClick={() => setExpanded(!expanded)} />
    </div>}
  </nav>
}

export default Navbar;
