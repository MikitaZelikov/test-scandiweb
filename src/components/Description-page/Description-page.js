import { Component } from 'react';
import { connect } from 'react-redux';

import './description-page.scss';
import Header from '../Header/Header';

class DescriptionPage extends Component {
  state = {
    mainPhoto: '',
  };

  handleClickPhoto = (uri) => {
    this.setState((prevState) => ({
      ...prevState,
      mainPhoto: uri,
    }));
  };

  render() {
    const refId = window.location.pathname.split('/').pop();
    const { products, currency } = this.props;
    const currentProduct = products.find((item) => item.id === refId);
    const currentAmount = currentProduct.prices.find((item) => item.currency === currency).amount;
    const attributesProduct = currentProduct.attributes;

    return (
      <div>
        <Header />
        <main className="description-container">
          <ul className="product-gallery" id="product-gallery">
            {
              currentProduct.gallery.map((item, index) => (
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
          <figure className="product-figure" id="product-figure">
            <img src={this.state.mainPhoto || currentProduct.gallery[0]} alt="main photo" />
          </figure>
          <article className="product-description" id="product-description">
            <div className="product-description__heading">
              <h1 className="product-description__heading--title">{currentProduct.brand}</h1>
              <p className="product-description__heading--desc">{currentProduct.name}</p>
            </div>
            {
              attributesProduct.map((attr, idx) => (
                <div className="product-description__size">
                  <p key={idx} className="product-description__size--title">
                    {`${attr.name}:`}
                  </p>
                  <ul className="product-description__size--btns">
                    {
                      attr?.items.map((elem) => (
                        <li style={attr.type === 'swatch' ? { backgroundColor: elem.value } : null}>
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
              <p className="product-description__price--amount">{`${currentAmount} ${currency}`}</p>
            </div>
            <button className="product-description__add-btn">ADD TO CART</button>
            <p
              className="product-description__overview"
              dangerouslySetInnerHTML={{ __html: currentProduct.description }}
            />
          </article>
        </main>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   getProducts: (activeCategory) => dispatch(loadProducts(activeCategory)),
// });

function mapStateToProps(state) {
  return {
    products: state.productsData.productsList,
    currency: state.productsData.activeCurrency,
  };
}

export default connect(mapStateToProps)(DescriptionPage);
