import React from 'react';
import './Navbar.scss';
// @ts-ignore
import logo from '../../assets/img/logo/pp-logo.svg';
import {
  faPlusCircle,
  faArrowLeft,
  faCalendarDays,
  faMap,
  faTrashCan,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';
import { Link, animateScroll as scroll } from 'react-scroll';
import CountriesSearch from './search/CountriesSearch';
import { useDroppable } from '@dnd-kit/core';
import { TRASH_ID } from '../../App';

export interface NavbarProps {
  expanded: boolean;
  dragInProgress: boolean;
  setExpanded: (value: boolean) => void;
  regenKey: number;
  onOpenUserProfile: () => void;
}

const Navbar = ({ expanded, dragInProgress, setExpanded, regenKey, onOpenUserProfile }: NavbarProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: TRASH_ID });

  return <div>
    <nav ref={setNodeRef} className={'navbar ' + (expanded ? ' expanded' : '')}>
      {dragInProgress && (
        <div className="trash-wrapper">
          <div className={`trash-overlay ${isOver ? 'over' : ''}`}>
            <div className="text">{expanded ? 'Drop here to discard' :
              <FontAwesomeIcon icon={faTrashCan} className={'icon'} />}
            </div>
          </div>
        </div>
      )}
      {
        expanded ? (<Header />) : (<div className="logo-only">
          <img src={logo} alt="Logo" onClick={() => scroll.scrollToTop({ duration: 250 })} />
        </div>)
      }

      {!expanded && <div className="menu-item" onClick={() => setExpanded(!expanded)}>
        <FontAwesomeIcon icon={faPlusCircle} className={'icon'} />
        <div className="menu-item-desc">Add more</div>
      </div>}

      {!expanded &&
        <Link to="calendar" smooth={true} duration={250}>
          <div className="menu-item">
            <FontAwesomeIcon icon={faCalendarDays} className={'icon'} />
            <div className="menu-item-desc">Calendar</div>
          </div>
        </Link>
      }

      {!expanded &&
        <Link to="world-map" smooth={true} duration={250}>
          <div className="menu-item">
            <FontAwesomeIcon icon={faMap} className={'icon'} />
            <div className="menu-item-desc">World Map</div>
          </div>
        </Link>
      }

      {expanded && <CountriesSearch dragInProgress={dragInProgress} regenKey={regenKey} />}

      {expanded &&
        <div className="menu-item menu-item-bottom" onClick={() => setExpanded(!expanded)}>
          <FontAwesomeIcon icon={faArrowLeft} className={'icon'} />
        </div>
      }

      {!expanded &&
        <div className="menu-item menu-item-bottom" onClick={() => onOpenUserProfile()}>
          <FontAwesomeIcon icon={faUser} className={'icon'} />
          <div className="menu-item-desc">Me</div>
        </div>
      }
    </nav>
  </div>;
};

export default Navbar;
