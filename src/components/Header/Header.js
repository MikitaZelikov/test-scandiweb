import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './header.scss';
import CurrenciesDropdown from '../Currencies-dropdown/Currencies-dropdown';
import CartDropdown from '../Cart-dropdown/Cart-dropdown';
import Tab from '../Tab/Tab';
import aLogo from '../../assets/icons/Group.svg';

class Header extends Component {
  render() {
    const categories = this.props.allCategories;

    return (
      <header className="header">
        <nav className="header__nav header-nav">
          {
            categories?.map((item, index) => (
              <Tab
                key={index}
                text={item.name}
              />
            ))
          }
          <Tab text={'all'} />
        </nav>
        <div className="header__logo header-logo">
          <Link to="/" className="header-logo__link">
            <img src={aLogo} alt="main logo" />
          </Link>
        </div>
        <div className="header__selection header-selection">
          <CurrenciesDropdown />
          <CartDropdown />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  allCategories: state.productsData.allCategories,
});

export default connect(mapStateToProps)(Header);
