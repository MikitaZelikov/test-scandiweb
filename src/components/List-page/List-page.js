import { Component } from 'react';
import { connect } from 'react-redux';

import './list-page.scss';
import Header from '../Header/Header';
import ListProduct from '../List-product/List-product';
import ProductAttributes from '../Product-attributes/Product-attributes';
import { getProducts, getMixedProducts } from '../../api/api-graphql';
import { toggleOverlay } from '../../store/reducers/generalReducer';

class ListPage extends Component {
  constructor() {
    super();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  state = {
    products: [],
    addedProduct: null,
    popupIsOpened: false,
  };

  handleCartClick = (id, e) => {
    const addedProd = this.state.products.find((item) => item.id === id);
    this.setState((prevState) => ({
      ...prevState,
      popupIsOpened: !prevState.popupIsOpened,
      addedProduct: addedProd,
    }));
    this.props.toggleOverlay();
    e.preventDefault();
  }

  handleDocumentClick(e) {
    if (this.state.popupIsOpened) {
      if (e.target.closest('.list-product__info--cart')
        || e.target.closest('.product-description__info-block--popup')) return;
      this.setState((prevState) => ({
        ...prevState,
        popupIsOpened: false,
      }));
      this.props.toggleOverlay();
    }
  }

  async fetchProducts() {
    this.setState((prevState) => ({
      ...prevState,
      products: [],
    }));
    const { category } = this.props;
    let products;
    if (category === 'all') {
      products = await getMixedProducts();
    } else {
      products = await getProducts(category);
    }
    this.setState((prevState) => ({
      ...prevState,
      products,
    }));
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
    this.fetchProducts();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.fetchProducts();
    }
  }

  render() {
    const { category, isOverlay } = this.props;
    const { products, addedProduct, popupIsOpened } = this.state;

    return (
      <div className="wrapper">
        <Header />
        <div className="overlay" hidden={!isOverlay}></div>
        {
          popupIsOpened ? (
            <ProductAttributes product={addedProduct} popupIsOpened={popupIsOpened} />
          ) : null
        }
        <section className="container">
          <h1>{category.toUpperCase()}</h1>
          <div className="container__list">
            {
              products?.map((item, index) => (
                <ListProduct
                  key={index}
                  urlImg={item.gallery[0]}
                  handleCartClick={this.handleCartClick}
                  {...item}
                />
              ))
            }
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.productsData.activeCategory,
  isOverlay: state.productsData.isOverlay,
});

const mapDispatchToProps = (dispatch) => ({
  toggleOverlay: () => dispatch(toggleOverlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
