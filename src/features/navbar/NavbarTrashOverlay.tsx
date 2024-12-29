import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDroppable } from '@dnd-kit/core';
import { TRASH_ID } from '../../App';

interface HeaderProps {
  expanded?: boolean;
}

const NavbarTrashOverlay = ({ expanded = false }: HeaderProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: TRASH_ID });

  return (
    <div
      ref={setNodeRef}
      className={clsx('fixed top-0 left-0 bottom-0 w-14 rounded z-40 bg-navbar-trash backdrop-blur', { 'bg-navbar-trash-over backdrop-blur': isOver }, { 'w-64': expanded })}>
      <div
        className="absolute justify-center text-center text-danger top-1/2 left-1/2 text-2xl transform -translate-x-1/2 -translate-y-1/2">
        {expanded ? 'Drop here to discard' : <FontAwesomeIcon icon={faTrashCan} className="h-6 w-6" />}
      </div>
    </div>
  );
};

export default NavbarTrashOverlay;
