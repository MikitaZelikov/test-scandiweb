import { Component } from 'react';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';

import './description-page.scss';
import Header from '../Header/Header';
import ProductAttribute from '../Product-attribute/Product-attribute';
import { getProduct } from '../../api/api-graphql';

class DescriptionPage extends Component {
  state = {
    mainPhoto: '',
    product: null,
  };

  handleClickPhoto = (uri) => {
    this.setState((prevState) => ({
      ...prevState,
      mainPhoto: uri,
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
    const { isOverlay } = this.props;
    const { product, mainPhoto } = this.state;
    const inStock = product?.inStock;
    const sanitizer = DOMPurify.sanitize;

    return product ? (
      <div className="wrapper">
        <Header />
        <div className="overlay" hidden={!isOverlay}></div>
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
            <ProductAttribute product={product} />
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

const mapStateToProps = (state) => ({
  cart: state.productsData.cart,
  isOverlay: state.productsData.isOverlay,
});

export default connect(mapStateToProps)(DescriptionPage);
