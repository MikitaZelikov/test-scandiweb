import { Component } from 'react';
import { connect } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';

import './product.scss';
import { setProductAmount } from '../../store/reducers/generalReducer';

class Product extends Component {
  state = {
    counterImg: 0,
  }

  handleCounterClick = (e) => {
    const { setProductAmount: setProdAmount, product } = this.props;
    let refreshAmount;

    if (e.currentTarget.id === 'counter-decrem-btn') {
      refreshAmount = product.amount === 1 ? 1 : product.amount - 1;
      setProdAmount({ amount: refreshAmount, id: product.additionalId });
    }

    if (e.currentTarget.id === 'counter-increm-btn') {
      refreshAmount = product.amount + 1;
      setProdAmount({ amount: refreshAmount, id: product.additionalId });
    }
  };

  handleSliderClick = (e) => {
    if (e.target.id === 'slider-prev-btn') {
      this.setState((prevState) => ({
        ...prevState,
        counterImg: prevState.counterImg === 0
          ? this.props.product.gallery.length - 1 : prevState.counterImg - 1,
      }));
    }
    if (e.target.id === 'slider-next-btn') {
      this.setState((prevState) => ({
        ...prevState,
        counterImg: prevState.counterImg + 1,
      }));
    }
  };

  render() {
    const { counterImg } = this.state;
    const { brand, name, prices, gallery, attributes, amount } = this.props.product;
    const activeCurrency = this.props.activeCurrency;
    const price = prices.filter((item) => (item.currency === activeCurrency))[0].amount;
    const isCart = this.props.localPath === '/cart';

    return (
      <li className={isCart ? 'product-item' : 'product-item product-item--dropdown'}>
        <div className="product-description">
          <h1 className={isCart ? 'product-description__title'
            : 'product-description__title--dropdown'}>
            {brand}
          </h1>
          <p className={isCart ? 'product-description__desc'
            : 'product-description__desc--dropdown'}>{name}</p>
          <p className={isCart ? 'product-description__amount'
            : 'product-description__amount--dropdown'}>
            {`${getSymbolFromCurrency(activeCurrency)}${price}`}
          </p>
          <ul className="product-description__btns">
            {
              attributes?.map((item, index) => (
                <li>
                  {item.name}
                  <p
                    key={index}
                    style={item.type === 'swatch' ? { backgroundColor: item.value } : null}
                    className={isCart ? 'product-description__size--title'
                      : 'product-description__size--title--dropdown'}>
                    {item.type === 'swatch' ? '' : item.value}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="product-preview">
          <div className="product-preview__counter">
            <button
              id="counter-increm-btn"
              className="product-preview__counter--btn"
              onClick={this.handleCounterClick}>
              <svg className={isCart ? '' : 'counter-btn__dropdown'} width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 15V30" stroke="#1D1F22" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M15 22.5H30" stroke="#1D1F22" stroke-linecap="round"
                  stroke-linejoin="round" />
                <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
              </svg>
            </button>
            <span className={isCart ? 'product-preview__counter--amount'
              : 'product-preview__counter--amount--dropdown'}>
              {amount}
            </span>
            <button
              id="counter-decrem-btn"
              className="product-preview__counter--btn"
              onClick={this.handleCounterClick}>
              <svg className={isCart ? '' : 'counter-btn__dropdown'} width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 22.5H30" stroke="#1D1F22" stroke-linecap="round"
                  stroke-linejoin="round" />
                <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
              </svg>
            </button>
          </div>
          <div className={isCart ? 'product-preview__figure' : 'product-preview__figure--dropdown'}>
            <img src={gallery[counterImg % gallery.length]} alt='image product' />
            <div className="product-preview__slider">
              <button id="slider-prev-btn"
                className="product-preview__slider--btn"
                onClick={this.handleSliderClick}
                hidden={!isCart}>
                {'<'}
              </button>
              <button id="slider-next-btn"
                className="product-preview__slider--btn"
                onClick={this.handleSliderClick}
                hidden={!isCart}>
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
  currentCart: state.productsData.cart,
});

const mapDispatchToProps = (dispatch) => ({
  setProductAmount: ({ amount, id }) => dispatch(setProductAmount({ amount, id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
