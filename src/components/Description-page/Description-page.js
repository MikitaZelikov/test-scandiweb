import { Component } from 'react';
import { connect } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import { nanoid } from 'nanoid';
import DOMPurify from 'dompurify';

import './description-page.scss';
import Header from '../Header/Header';
import { getProduct } from '../../api/api-graphql';
import { addProductToCart } from '../../store/reducers/generalReducer';

class DescriptionPage extends Component {
  state = {
    mainPhoto: '',
    product: null,
    selectedAttributes: {},
    isWarningMessage: false,
  };

  handleClickAdd = (state, e) => {
    const { selectedAttributes, product } = this.state;
    const isDisabledAddBtn = Object.keys(selectedAttributes)?.length !== product.attributes.length;

    if (isDisabledAddBtn) {
      this.setState((prevState) => ({
        ...prevState,
        isWarningMessage: true,
      }));
      e.preventDefault();
      return;
    }

    const selectedProd = { ...state.product };
    const attributesProd = Object.values(state.selectedAttributes);
    selectedProd.attributes = attributesProd;
    selectedProd.amount = 1;
    selectedProd.additionalId = nanoid(6);
    this.props.addProductToCart(selectedProd);
  };

  handleClickPhoto = (uri) => {
    this.setState((prevState) => ({
      ...prevState,
      mainPhoto: uri,
    }));
  };

  handleSelectedOption = (name, type, value) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedAttributes: { ...prevState.selectedAttributes, [name]: { name, type, value } },
    }));
  };

  async componentDidMount() {
    const id = window.location.pathname.split('/').pop();
    const product = await getProduct(id);
    this.setState((prevState) => ({
      ...prevState,
      product,
    }));
  }

  render() {
    const { currency, isOpened } = this.props;
    const { product, mainPhoto, selectedAttributes, isWarningMessage } = this.state;
    const inStock = product?.inStock;
    const currentAmount = product?.prices.find((item) => item.currency === currency).amount;
    const productAttributes = product?.attributes;
    const isDisabledAddBtn = Object.keys(selectedAttributes)?.length !== productAttributes?.length;
    const sanitizer = DOMPurify.sanitize;

    return product ? (
      <div className="wrapper">
        <Header />
        <div className="overlay" hidden={!isOpened}></div>
        <main className="description-container">
          <ul
            className={inStock ? 'product-gallery' : 'product-gallery product-gallery--out-of-stock'}
            id="product-gallery"
          >
            {
              product.gallery.map((item, index) => (
                <li
                  key={index}
                  className="product-gallery__photo"
                  onClick={() => this.handleClickPhoto(item)}
                >
                  <img src={item} />
                </li>
              ))
            }
          </ul>
          <figure
            className="product-figure"
            id="product-figure"
            className={inStock ? 'product-figure' : 'product-figure product-figure--out-of-stock'}
          >
            {inStock || <p className="out-of-stock">OUT OF STOCK</p>}
            <img src={mainPhoto || product.gallery[0]} alt="main photo" />
          </figure>
          <article className="product-description" id="product-description">
            <div className="product-description__heading">
              <h1 className="product-description__heading--title">{product.brand}</h1>
              <p className="product-description__heading--desc">{product.name}</p>
            </div>
            {
              productAttributes.map((attr, idx) => (
                <div className="product-description__size" key={idx}>
                  <p className="product-description__size--title">
                    {`${attr.name}:`}
                  </p>
                  <ul className="product-description__size--btns">
                    {
                      attr?.items.map((elem, i) => (
                        <li
                          key={i}
                          className={selectedAttributes[attr.name]?.value === elem.value
                            ? 'selected' : null}
                          style={attr.type === 'swatch' ? { backgroundColor: elem.value } : null}
                          onClick={() => this.handleSelectedOption(
                            attr.name,
                            attr.type,
                            elem.value)}>
                          {attr.type === 'swatch' ? '' : elem.value}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
            {
              isWarningMessage && isDisabledAddBtn ? (
                <span className="product-description__warning">
                  select properties for this product
                </span>
              ) : null
            }
            <div className="product-description__price">
              <p className="product-description__price--title">PRICE:</p>
              <p className="product-description__price--amount">
                {`${getSymbolFromCurrency(currency)}${currentAmount}`}
              </p>
            </div>
            <button
              className="product-description__add-btn"
              onClick={(e) => this.handleClickAdd(this.state, e)}
              hidden={!inStock || false}
            >
              ADD TO CART
            </button>
            <p
              className="product-description__overview"
              dangerouslySetInnerHTML={{ __html: sanitizer(product.description) }}
            />
          </article>
        </main>
      </div>
    ) : '';
  }
}

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (localState) => dispatch(addProductToCart(localState)),
});

const mapStateToProps = (state) => ({
  currency: state.productsData.activeCurrency,
  cart: state.productsData.cart,
  isOpened: state.productsData.dropdownCartIsOpened,
});

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionPage);
