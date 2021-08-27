import { Component } from 'react';
import { connect } from 'react-redux';

import './header.scss';
import Category from '../Category/Category';
import aLogo from '../../assets/icons/Group.svg';
import currency from '../../assets/icons/Frame2.svg';
import vectorDown from '../../assets/icons/VectorDown.svg';
import cart from '../../assets/icons/EmptyCart.svg';

class Header extends Component {
  // componentDidUpdate() {
  // }

  render() {
    const categories = this.props.allCategories;

    return (
      <header className="header">
        <nav className="header__nav header-nav">
          {
            categories?.map((item, index) => (
              <Category
                key={index}
                text={item.name}
              />
            ))
          }
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
          <a href="/cart" className="header-selection__link">
            <img src={cart} alt="cart" />
          </a>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    allCategories: state.productsData.allCategories,
    allCurrencies: state.productsData.allCurrencies,
  };
}

export default connect(mapStateToProps)(Header);
