import { Component } from 'react';

import './product.scss';
import ProductCart from '../../assets/icons/ProductCart.png';

class Product extends Component {
  render() {
    return (
      <li className="product-item">
        <div className="product-description">
          <h1 className="product-description__title">Apollo</h1>
          <p className="product-description__desc">Running Short</p>
          <p className="product-description__amount">$50.00</p>
          <ul className="product-description__btns">
            <li>M</li>
            <li>L</li>
          </ul>
        </div>
        <div className="product-preview">
          <div className="product-preview__counter">
            <button className="product-preview__counter--btn">
              <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 15V30" stroke="#1D1F22" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M15 22.5H30" stroke="#1D1F22" stroke-linecap="round"
                  stroke-linejoin="round" />
                <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
              </svg>
            </button>
            <span className="product-preview__counter--amount">1</span>
            <button className="product-preview__counter--btn">
              <svg width="45" height="45" viewBox="0 0 45 45" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M15 22.5H30" stroke="#1D1F22" stroke-linecap="round"
                  stroke-linejoin="round" />
                <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
              </svg>
            </button>
          </div>
          <div className="product-preview__figure">
            <img src={ProductCart} alt='image product' />
            <div className="product-preview__slider">
              <button className="product-preview__slider--btn">{'<'}</button>
              <button className="product-preview__slider--btn">{'>'}</button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Product;
