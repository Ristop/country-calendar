import React from 'react';
import './Header.scss';
// @ts-ignore
import logoWithText from '../../assets/img/logo/pp-logo-text.svg';
// @ts-ignore
import logo from '../../assets/img/logo/pp-logo.svg';

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
        <img src={logo} alt='Logo'/>
      </div>
      <div className='logo-text'>
        <img src={logoWithText} alt='Logo with text'/>
      </div>
    </div>
  );
};

export default Header;
