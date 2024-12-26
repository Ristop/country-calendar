import React from 'react';
import {
  faPlusCircle,
  faArrowLeft,
  faCalendarDays,
  faMap,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import NavbarHeader from './NavbarHeader';
import CountriesSearch from './search/CountriesSearch';
import clsx from 'clsx';
import NavbarItem from './NavbarItem';
import NavbarTrashOverlay from './NavbarTrashOverlay';

export interface NavbarProps {
  expanded: boolean;
  dragInProgress: boolean;
  setExpanded: (value: boolean) => void;
  regenKey: number;
  onOpenUserProfile: () => void;
}

const Navbar = ({ expanded, dragInProgress, setExpanded, regenKey, onOpenUserProfile }: NavbarProps) => {
  return <div>
    <nav
      className={clsx('fixed top-0 left-0 bottom-0 hidden md:flex flex-col bg-navbar-default backdrop-blur w-14 m-1 box-border px-1 py-4 rounded gap-1 z-30 main-animation', { 'w-64 pt-8': expanded })}>
      {dragInProgress && <NavbarTrashOverlay expanded={expanded} />}

      <NavbarHeader expanded={expanded} />

      {expanded && <CountriesSearch regenKey={regenKey} />}

      <NavbarItem label={'Add more'} icon={faPlusCircle} show={!expanded} onClick={() => setExpanded(!expanded)} />
      <NavbarItem label={'Calendar'} icon={faCalendarDays} show={!expanded} linkId={'calendar'} />
      <NavbarItem label={'World Map'} icon={faMap} show={!expanded} linkId={'world-map'} />

      <NavbarItem label={'Close'} icon={faArrowLeft} show={expanded} bottom={true}
                  onClick={() => setExpanded(!expanded)} />
      <NavbarItem label={'Me'} icon={faUser} show={!expanded} bottom={true} onClick={() => onOpenUserProfile()} />
    </nav>
  </div>;
};

export default Navbar;
