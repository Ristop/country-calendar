import React, { useState } from 'react';
import clsx from 'clsx';
import CountriesSearch from '../navbar/search/CountriesSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

export interface MobileNavigationProps {
  regenKey: number;
}

const MobileNavigation = ({ regenKey }: MobileNavigationProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx(`flex flex-col md:hidden fixed bottom-1 right-1 z-50 main-animation`, { 'cursor-pointer': !open }, { 'left-1 h-64 max-h-64 overflow-hidden rounded p-2 bg-navbar-default': open })}
    >
      <div className={clsx({ 'hidden': open })}>
        <FontAwesomeIcon icon={faPlusCircle} onClick={() => setOpen(true)}
                         className="h-10 w-10 text-base-blue opacity-80 cursor-pointer" />
      </div>
      {open && <CountriesSearch regenKey={regenKey} />}
      <div className={clsx('text-end', { 'hidden': !open })}>
        <FontAwesomeIcon icon={faMinusCircle} onClick={() => setOpen(false)}
                         className="ml-auto h-10 w-10 text-base-blue opacity-80 cursor-pointer" />
      </div>
    </div>
  );
};

export default MobileNavigation;
