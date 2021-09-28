import { Component } from 'react';
import { nanoid } from 'nanoid';
import getSymbolFromCurrency from 'currency-symbol-map';
import { connect } from 'react-redux';

import './product-attributes.scss';
import { addProductToCart } from '../../store/reducers/generalReducer';

class ProductAttributes extends Component {
  state = {
    product: this.props.product,
    selectedAttributes: {},
    isWarningMessage: false,
  };

  handleClickAdd = (state, e) => {
    const { selectedAttributes, product } = this.state;
    const isDisabledAddBtn = Object.keys(selectedAttributes)?.length !== product?.attributes.length;

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

  handleSelectedOption = (name, type, value) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedAttributes: { ...prevState.selectedAttributes, [name]: { name, type, value } },
    }));
  };

  render() {
    const { currency, popupIsOpened } = this.props;
    const { product, selectedAttributes } = this.state;
    const productAttributes = product?.attributes;
    const inStock = product?.inStock;
    const currentAmount = product?.prices.find((item) => item.currency === currency).amount;

    return (
      <div className={popupIsOpened ? 'product-description__info-block--popup'
        : 'product-description__info-block'}>
        {
          productAttributes.map((attr, idx) => this.renderAttribute(attr, idx, selectedAttributes))
        }
        {
          this.renderValidation()
        }
        <div className="product-description__price" hidden={popupIsOpened}>
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
      </div>
    );
  }

  renderAttribute(attr, idx, selectedAttributes) {
    return (
      <div className="product-description__attribute" key={idx}>
        <p className="product-description__attribute--title">
          {`${attr.name}:`}
        </p>
        <ul className="product-description__attribute--btns">
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
    );
  }

  renderValidation() {
    const { product, selectedAttributes, isWarningMessage } = this.state;
    const productAttributes = product?.attributes;
    const isDisabledAddBtn = Object.keys(selectedAttributes)?.length !== productAttributes?.length;
    return (
      <div>
        {
          isWarningMessage && isDisabledAddBtn ? (
            <span className="product-description__warning">
              select properties for this product
            </span>
          ) : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.productsData.activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (localState) => dispatch(addProductToCart(localState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttributes);
