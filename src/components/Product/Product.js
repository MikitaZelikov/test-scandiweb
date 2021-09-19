import { Component } from 'react';
import { connect } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';

import './product.scss';
import { setProductAmount, deleteProductFromCart } from '../../store/reducers/generalReducer';

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

  handleDeleteClick = (id) => {
    this.props.deleteProduct(id);
  };

  render() {
    const { counterImg } = this.state;
    const {
      brand,
      name,
      prices,
      gallery,
      attributes,
      amount,
      additionalId } = this.props.product;
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
                <li key={index}>
                  {item.name}
                  <p
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
        <div className="product-preview" id="product-preview">
          <div className="product-preview__counter">
            <button
              id="counter-increm-btn"
              className="product-preview__counter--btn"
              onClick={this.handleCounterClick}>
              <svg className={isCart ? '' : 'counter-btn__dropdown'} width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 15V30" stroke="#1D1F22" strokeLinecap="round"
                  strokeLinejoin="round" />
                <path d="M15 22.5H30" stroke="#1D1F22" strokeLinecap="round"
                  strokeLinejoin="round" />
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
                <path d="M15 22.5H30" stroke="#1D1F22" strokeLinecap="round"
                  strokeLinejoin="round" />
                <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
              </svg>
            </button>
          </div>
          <div className="product-delete-icon" onClick={() => this.handleDeleteClick(additionalId)}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.9844 11.9844V14H13.0156V11.9844H16.4844L17.5156
            11H22.4844L23.5156 11.9844H26.9844ZM14 26.9844V14.9844H26V26.9844C26
            27.5156 25.7969 27.9844 25.3906 28.3906C24.9844 28.7969 24.5156 29
            23.9844 29H16.0156C15.4844 29 15.0156 28.7969 14.6094 28.3906C14.2031
            27.9844 14 27.5156 14 26.9844Z" fill="#666666" />
              <circle cx="20" cy="20" r="15" fill="#C4C4C4" fillOpacity="0.5" />
            </svg>
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
  deleteProduct: (id) => dispatch(deleteProductFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
