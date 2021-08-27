import { Component } from 'react';

import './cart-page.scss';
import Header from '../Header/Header';
import Product from '../Product/Product';

class Cart extends Component {
  render() {
    return (
      <div>
        <Header />
        <section className="cart-container">
          <h1 className="cart-container__title">CART</h1>
          <ul className="cart-container__list">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
          </ul>
        </section>
      </div>
    );
  }
}

export default Cart;
