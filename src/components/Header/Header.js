import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';

import './header.scss';
import DropdownCurrencies from '../DropdownCurrencies/DropdownCurrencies';
import Tab from '../Tab/Tab';
import { setCurrency } from '../../store/reducers/generalReducer';
import aLogo from '../../assets/icons/Group.svg';
import vectorDown from '../../assets/icons/VectorDown.svg';
import cart from '../../assets/icons/EmptyCart.svg';

class Header extends Component {
  state = {
    isOpenedCurrencies: false,
    isOpenedCart: false,
  };

  handleDropdownCurrencies = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  handleActivateCurrency = (currency) => {
    this.props.setCurrency(currency);
    this.setState({ isOpened: !this.state.isOpened });
  };

  render() {
    const categories = this.props.allCategories;
    const currencies = this.props.allCurrencies;
    const activeCurrency = getSymbolFromCurrency(this.props.activeCurrency);
    const defaultCurrency = getSymbolFromCurrency(currencies[0]);

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
        </nav>
        <div className="header__logo header-logo">
          <Link to="/" className="header-logo__link">
            <img src={aLogo} alt="main logo" />
          </Link>
        </div>
        <div className="header__selection header-selection">
          <Link to="#" className="header-selection__link" onClick={this.handleDropdownCurrencies}>
            <p className="header-selection__currency">{activeCurrency || defaultCurrency}</p>
            <img src={vectorDown} alt="arrow" />
          </Link>
          <Link to="/cart" className="header-selection__link">
            <img src={cart} alt="cart" />
          </Link>
          {this.state.isOpened ? <DropdownCurrencies
            currencies={currencies}
            handleActivateCurrency={this.handleActivateCurrency} /> : null}
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    allCategories: state.productsData.allCategories,
    allCurrencies: state.productsData.allCurrencies,
    activeCurrency: state.productsData.activeCurrency,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (currency) => dispatch(setCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
