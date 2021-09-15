import { Component } from 'react';
import { connect } from 'react-redux';

import './cart-page.scss';
import Header from '../Header/Header';
import Product from '../Product/Product';

class Cart extends Component {
  render() {
    const { cart } = this.props;
    const localPath = window.location.pathname;

    return (
      <div>
        <Header />
        <section className="cart-container">
          <h1 className="cart-container__title">CART</h1>
          <ul className="cart-container__list">
            {
              cart?.map((item, index) => (
                <Product key={index} product={item} localPath={localPath}/>
              ))
            }
          </ul>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.productsData.cart,
});

export default connect(mapStateToProps)(Cart);
