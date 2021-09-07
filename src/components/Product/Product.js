import { Component } from 'react';
import { connect } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';

import './product.scss';

class Product extends Component {
  state = {
    counterImg: 0,
  }

  handleSliderClick = (e) => {
    if (e.target.id === 'slider-prev-btn') {
      this.setState(() => ({
        counterImg: this.state.counterImg === 0
          ? this.props.product.gallery.length - 1 : this.state.counterImg - 1,
      }));
    }
    if (e.target.id === 'slider-next-btn') {
      this.setState(() => ({
        counterImg: this.state.counterImg + 1,
      }));
    }
  };

  componentDidUpdate() {
    // eslint-disable-next-line no-console
    console.log(this.state);
  }

  render() {
    const { brand, name, prices, gallery } = this.props.product;
    const activeCurrency = this.props.activeCurrency;
    const amount = prices.filter((item) => (item.currency === activeCurrency))[0].amount;

    return (
      <li className="product-item">
        <div className="product-description">
          <h1 className="product-description__title">{brand}</h1>
          <p className="product-description__desc">{name}</p>
          <p className="product-description__amount">
            {`${getSymbolFromCurrency(activeCurrency)}${amount}`}
          </p>
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
            <img src={gallery[this.state.counterImg % gallery.length]} alt='image product' />
            <div className="product-preview__slider">
              <button id="slider-prev-btn"
                className="product-preview__slider--btn"
                onClick={this.handleSliderClick}>
                {'<'}
              </button>
              <button id="slider-next-btn"
                className="product-preview__slider--btn"
                onClick={this.handleSliderClick}>
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCurrency: state.productsData.activeCurrency,
});

export default connect(mapStateToProps)(Product);
