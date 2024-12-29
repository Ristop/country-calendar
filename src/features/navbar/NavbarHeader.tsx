import React from 'react';
// @ts-ignore
import logoWithText from '../../assets/img/logo/pp-logo-text.svg';
// @ts-ignore
import logo from '../../assets/img/logo/pp-logo.svg';
import { animateScroll as scroll } from 'react-scroll';

interface HeaderProps {
  expanded?: boolean;
}

const NavbarHeader = ({ expanded = false }: HeaderProps) => {
  return (
    <div className="flex justify-center gap-5 mb-7 cursor-pointer"
         onClick={() => scroll.scrollToTop({ duration: 250 })}>
      <div className="flex justify-center items-center">
        <img className="h-12 rotate-6" src={logo} alt="Logo" />
      </div>
      {expanded &&
        <div className="flex justify-center items-center">
          <img className="h-9" src={logoWithText} alt="Logo with text" />
        </div>
      }
    </div>
  );
};

export default NavbarHeader;
