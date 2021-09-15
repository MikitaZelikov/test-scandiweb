import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';

import cart from '../../assets/icons/EmptyCart.svg';
import Product from '../Product/Product';
import './cartDropdown.scss';

class CartDropdown extends Component {
  constructor() {
    super();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  state = {
    isOpened: false,
  };

  toggleDropdownCart = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  handleDocumentClick(e) {
    if (e.target.closest('#cart-dropdown')) return;
    this.setState({ isOpened: false });
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  render() {
    const currentCart = this.props.cart;
    const localPath = window.location.pathname;
    const activeCurrency = this.props.activeCurrency;
    const getTotal = (amount, prod) => {
      const currentPrice = prod.prices.find((price) => price.currency === activeCurrency);
      const total = amount + currentPrice.amount;
      return Math.round(total * 100) / 100;
    };

    return (
      <section id="cart-dropdown" className="cart-dropdown">
        <div to="/cart" className="cart-dropdown__link" onClick={this.toggleDropdownCart}>
          <img src={cart} alt="cart" />
          {
            localPath !== '/cart' ? (
            <span className="cart-dropdown__counter-icon">{currentCart.length}</span>) : null
          }
        </div>
        {
          this.state.isOpened && localPath !== '/cart' ? (
            <div className="cart-dropdown__overlay">
              <h1 className="cart-dropdown__title">
                <span><b>My Bag,</b></span>{` ${currentCart.length} items`}
              </h1>
              <ul className="cart-dropdown__list">
                {
                  currentCart?.map((item, index) => (
                    <Product key={index} product={item} localPath={localPath}/>
                  ))
                }
              </ul>
              <div className="cart-dropdown__total cart-dropdown-total">
                <p className="cart-dropdown-total__title">Total</p>
                <p className="cart-dropdown-total__amount">
                  {`${getSymbolFromCurrency(activeCurrency)}${currentCart?.reduce(getTotal, 0)}`}
                </p>
              </div>
              <div className="cart-dropdown__action-block action-block">
                <Link to="/cart" className="action-block__btn action-block__btn--view">
                  VIEW BAG
                </Link>
                <Link to="#" className="action-block__btn action-block__btn--buy">CHECK OUT</Link>
              </div>
            </div>) : null
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.productsData.cart,
  activeCurrency: state.productsData.activeCurrency,
});

export default connect(mapStateToProps)(CartDropdown);
