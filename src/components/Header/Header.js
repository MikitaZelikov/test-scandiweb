import { Component } from 'react';

import './header.scss';
import aLogo from '../../assets/icons/Group.svg';
import currency from '../../assets/icons/Frame2.svg';
import vectorDown from '../../assets/icons/VectorDown.svg';
import cart from '../../assets/icons/EmptyCart.svg';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="header__nav header-nav">
          <a href="/" className="header-nav__link">WOMEN</a>
          <a href="/" className="header-nav__link">MEN</a>
          <a href="/" className="header-nav__link">KIDS</a>
        </nav>
        <div className="header__logo header-logo">
          <a href="/" className="header-logo__link">
            <img src={aLogo} alt="main logo" />
          </a>
        </div>
        <div className="header__selection header-selection">
          <a href="/" className="header-selection__link">
            <img src={currency} alt="currency icon" />
            <img src={vectorDown} alt="arrow" />
          </a>
          <a href="/" className="header-selection__link">
            <img src={cart} alt="cart" />
          </a>
        </div>
      </header>
    );
  }
}

export default Header;
