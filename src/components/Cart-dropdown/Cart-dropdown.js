import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';

import cart from '../../assets/icons/EmptyCart.svg';
import CartProduct from '../Cart-product/Cart-product';
import { toggleOverlay } from '../../store/reducers/generalReducer';
import './cart-dropdown.scss';

class CartDropdown extends Component {
  constructor(props) {
    super(props);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  state = {
    isOpened: false,
  };

  handleDropdownCartClick = (e) => {
    this.setState((prevState) => ({ isOpened: !prevState.isOpened }));
    this.props.toggleOverlay();
    e.preventDefault();
  };

  handleDocumentClick(e) {
    if (this.state.isOpened) {
      if (e.target.closest('#cart-dropdown')) return;
      this.setState({ isOpened: false });
      this.props.toggleOverlay();
    }
  }

  getTotal = (count, prod) => {
    const currentPrice = prod.prices.find((price) => price.currency === this.props.activeCurrency);
    const total = count + currentPrice.amount * prod.amount;
    return Math.round(total * 100) / 100;
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentClick);
  }

  render() {
    const currentCart = this.props.cart;
    const localPath = window.location.pathname;
    const activeCurrency = this.props.activeCurrency;
    const totalCount = currentCart.reduce((count, prod) => prod.amount + count, 0);

    return (
      <section id="cart-dropdown" className="cart-dropdown">
        <div className="cart-dropdown__link" onClick={this.handleDropdownCartClick}>
          <img src={cart} alt="cart" />
          {
            localPath !== '/cart' ? (
              <span className="cart-dropdown__counter-icon">{totalCount}</span>) : null
          }
        </div>
        {
          this.state.isOpened && localPath !== '/cart' ? (
            <div className="cart-dropdown__menu">
              <h1 className="cart-dropdown__title">
                <span><b>My Bag,</b></span>{` ${totalCount} items`}
              </h1>
              <ul className="cart-dropdown__list">
                {
                  currentCart?.map((item, index) => (
                    <CartProduct key={index} product={item} localPath={localPath} />
                  ))
                }
              </ul>
              <div className="cart-dropdown__total cart-dropdown-total">
                <p className="cart-dropdown-total__title">Total</p>
                <p className="cart-dropdown-total__amount">
                  {`${getSymbolFromCurrency(activeCurrency)}${currentCart?.reduce(this.getTotal, 0)}`}
                </p>
              </div>
              <div className="cart-dropdown__action-block action-block">
                <Link
                  to="/cart"
                  className="action-block__btn action-block__btn--view"
                  onClick={this.props.toggleOverlay}
                >
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

const mapDispatchToProps = (dispatch) => ({
  toggleOverlay: () => dispatch(toggleOverlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
