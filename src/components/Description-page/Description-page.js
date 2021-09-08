import { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';

import './description-page.scss';
import Header from '../Header/Header';
import { getProduct } from '../../api/api-graphql';
import { addProductToCart } from '../../store/reducers/generalReducer';

const DescriptionPage = (props) => {
  const { id } = useParams();
  return <DescriptionPage1 {...props} id={id} />;
};

class DescriptionPage1 extends Component {
  state = {
    mainPhoto: '',
    product: null,
    selectedAttributes: {},
  };

  handleClickAdd = (state) => {
    const selectedProd = { ...state.product };
    const attributesProd = Object.values(state.selectedAttributes);
    selectedProd.attributes = attributesProd;
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
    const { id } = this.props;
    const product = await getProduct(id);
    this.setState((prevState) => ({
      ...prevState,
      product,
    }));
  }

  componentDidUpdate() {
    // eslint-disable-next-line no-console
    console.log(this.props.cart);
  }

  render() {
    const { currency } = this.props;
    const { product, mainPhoto, selectedAttributes } = this.state;
    const inStock = product?.inStock;
    const currentAmount = product?.prices.find((item) => item.currency === currency).amount;
    const productAttributes = product?.attributes;

    return product ? (
      <div>
        <Header />
        <main className="description-container">
          <ul
            className="product-gallery"
            id="product-gallery"
            style={!inStock ? { opacity: 0.5 } : null}
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
            style={!inStock ? { opacity: 0.5 } : null}
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
            <div className="product-description__price">
              <p className="product-description__price--title">PRICE:</p>
              <p className="product-description__price--amount">
                {`${getSymbolFromCurrency(currency)}${inStock ? currentAmount : '--'}`}
              </p>
            </div>
            <button
              className="product-description__add-btn"
              onClick={() => this.handleClickAdd(this.state)}
              hidden={!inStock || false}>
              ADD TO CART
            </button>
            <p
              className="product-description__overview"
              dangerouslySetInnerHTML={{ __html: product.description }}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionPage);
