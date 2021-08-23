import { Component } from 'react';

import './pdp.scss';
import Header from '../Header/Header';

class PDP extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="description-container">
          <ul id="product-gallery">
            <li></li>
          </ul>
          <figure id="product-figure"></figure>
          <article className="product-description" id="product-description">
            <div className="product-description__heading">
              <h1 className="product-description__heading--title">Apollo</h1>
              <p className="product-description__heading--desc">Running Short</p>
            </div>
            <div className="product-description__size">
              <p className="product-description__size--title">SIZE:</p>
              <ul className="product-description__size--btns">
                <li>XS</li>
                <li>S</li>
                <li>M</li>
                <li>L</li>
              </ul>
            </div>
            <div className="product-description__price">
              <p className="product-description__price--title">PRICE:</p>
              <p className="product-description__price--amount">$50.00</p>
            </div>
            <button className="product-description__add-btn">ADD TO CART</button>
            <p className="product-description__overview">
              Find stunning women's cocktail dresses and party dresses.
              Stand out in lace and metallic cocktail dresses and party
              dresses from all your favorite brands.
            </p>
          </article>
        </main>
      </div>

    );
  }
}

export default PDP;
