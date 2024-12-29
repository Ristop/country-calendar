import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-scroll';
import clsx from 'clsx';

interface NavbarItemProps {
  label: string;
  icon: IconDefinition;
  show: boolean;
  onClick?: () => void;
  bottom?: boolean;
  linkId?: string;
}

const NavbarItem = ({ label, icon, show, onClick, bottom = false, linkId }: NavbarItemProps) => {
  if (!show) {
    return null;
  }

  const content = (
    <div
      className={clsx('flex items-center justify-center h-12 w-12 rounded-lg cursor-pointer hover:bg-light-blue group', { 'mt-auto': bottom })}
      onClick={() => onClick && onClick()}
    >
      <FontAwesomeIcon icon={icon} className="h-6 w-6 cursor-pointer" />
      <div
        className={'absolute left-16 min-w-24 p-2 rounded-lg text-center z-50 opacity-80 text-white bg-dark-blue hidden group-hover:block'}>
        {label}
      </div>
    </div>
  );

  if (linkId) {
    return <Link to={linkId} smooth={true} duration={250}>
      {content}
    </Link>;
  } else {
    return content;
  }
};

export default NavbarItem;
