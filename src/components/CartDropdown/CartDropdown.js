import { Component } from 'react';
import { Link } from 'react-router-dom';

import cart from '../../assets/icons/EmptyCart.svg';

class CartDropdown extends Component {
  render() {
    return (
      <Link to="/cart" className="header-selection__link">
        <img src={cart} alt="cart" />
      </Link>
    );
  }
}

export default CartDropdown;
