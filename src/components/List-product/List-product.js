import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';

import './list-product.scss';

class ListProduct extends Component {
  render() {
    const { id, activeCurrency, urlImg, name, prices, inStock, brand, handleCartClick } = this.props;
    const productPrice = prices.filter((item) => item.currency === activeCurrency);
    const amount = productPrice[0].amount;

    return (
      <article className={inStock ? 'list-product' : 'list-product list-product--out-of-stock'}>
        <Link to={`/product/${id}`} className="list-product__link">
          {inStock || <p className="out-of-stock">OUT OF STOCK</p>}
          <img src={urlImg} alt="product" className="list-product__img" />
          <div className="list-product__info">
            <span className="list-product__info--cart" hidden={!inStock} onClick={(e) => handleCartClick(id, e)}>
              <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d)">
                  <circle cx="37" cy="33" r="26" fill="#5ECE7B" />
                  <path d="M48.4736 26.8484C48.0186 26.2925 47.3109 25.9546 46.5785 25.9546
                        H31.1907L30.711 24.1669C30.4326 23.1277 29.4732 22.4028 28.3608 22.4028
                        H25.7837C25.3544 22.4028 25 22.7407 25 23.1523C25 23.5628 25.3534 23.9017
                        25.7837 23.9017H28.3608C28.7398 23.9017 29.0685 24.1433 29.1692 24.5058
                        L32.2517 36.2494C32.53 37.2886 33.4894 38.0135 34.6018 38.0135H44.6833
                        C45.7947 38.0135 46.7808 37.2886 47.0335 36.2494L48.9286 28.807
                        C49.1053 28.1293 48.9543 27.4044 48.4736 26.8485L48.4736 26.8484
                        ZM47.3879 28.4671L45.4928 35.9095C45.3921 36.272 45.0634 36.5136
                        44.6844 36.5136H34.6018C34.2228 36.5136 33.8941 36.272 33.7935 35.9095
                        L31.5953 27.4772H46.5796C46.8323 27.4772 47.085 27.598 47.237 27.7915
                        C47.388 27.984 47.463 28.2257 47.388 28.4673L47.3879 28.4671Z"
                    fill="white" />
                  <path d="M35.1332 38.9778C33.6932 38.9778 32.5059 40.1132 32.5059 41.4902
                        C32.5059 42.8672 33.6933 44.0027 35.1332 44.0027C36.5733 44.0036 37.7606
                        42.8682 37.7606 41.491C37.7606 40.1137 36.5732 38.9775 35.1332 38.9775
                        V38.9778ZM35.1332 42.4814C34.5519 42.4814 34.0968 42.0463 34.0968 41.4903
                        C34.0968 40.9344 34.5519 40.4993 35.1332 40.4993C35.7146 40.4993 36.1696
                        40.9344 36.1696 41.4903C36.1687 42.0227 35.689 42.4814 35.1332 42.4814Z"
                    fill="white" />
                  <path d="M43.8251 38.978C42.3851 38.978 41.1978 40.1135 41.1978 41.4905
                        C41.1978 42.8675 42.3852 44.0029 43.8251 44.0029C45.2651 44.0029 46.4525
                        42.8675 46.4525 41.4905C46.4279 40.1143 45.2651 38.978 43.8251 38.978
                        ZM43.8251 42.4816C43.2438 42.4816 42.7887 42.0465 42.7887 41.4906C42.7887
                        40.9346 43.2438 40.4995 43.8251 40.4995C44.4065 40.4995 44.8615 40.9346
                        44.8615 41.4906C44.8615 42.0229 44.3809 42.4816 43.8251 42.4816Z"
                    fill="white" />
                </g>
                <defs>
                  <filter id="filter0_d" x="0" y="0" width="74" height="74"
                    filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="5.5" />
                    <feColorMatrix type="matrix"
                      values="0 0 0 0 0.113725 0 0 0 0 0.121569 0 0 0 0 0.133333 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix"
                      result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow"
                      result="shape" />
                  </filter>
                </defs>
              </svg>
            </span>
            <p className="list-product__info--name">{`${brand} ${name}`}</p>
            <p className="list-product__info--price">
              {`${getSymbolFromCurrency(activeCurrency)}${amount}`}
            </p>
          </div>
        </Link>
      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCurrency: state.productsData.activeCurrency,
});

export default connect(mapStateToProps)(ListProduct);
