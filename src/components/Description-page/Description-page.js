import { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import './description-page.scss';
import Header from '../Header/Header';
import { getProduct } from '../../api/api-graphql';

const DescriptionPage = (props) => {
  const { id } = useParams();
  return <DescriptionPage1 {...props} id={id} />;
};

class DescriptionPage1 extends Component {
  state = {
    mainPhoto: '',
    product: null,
  };

  async componentDidMount() {
    const { id } = this.props;
    const product = await getProduct(id);
    this.setState((prevState) => ({
      ...prevState,
      product,
    }));
  }

  handleClickPhoto = (uri) => {
    this.setState((prevState) => ({
      ...prevState,
      mainPhoto: uri,
    }));
  };

  render() {
    const { currency } = this.props;
    const { product, mainPhoto } = this.state;
    const currentAmount = product?.prices.find((item) => item.currency === currency).amount;
    const attributesProduct = product?.attributes;

    return product ? (
      <div>
        <Header />
        <main className="description-container">
          <ul className="product-gallery" id="product-gallery">
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
          <figure className="product-figure" id="product-figure">
            <img src={mainPhoto || product.gallery[0]} alt="main photo" />
          </figure>
          <article className="product-description" id="product-description">
            <div className="product-description__heading">
              <h1 className="product-description__heading--title">{product.brand}</h1>
              <p className="product-description__heading--desc">{product.name}</p>
            </div>
            {
              attributesProduct.map((attr, idx) => (
                <div className="product-description__size" key={idx}>
                  <p key={idx} className="product-description__size--title">
                    {`${attr.name}:`}
                  </p>
                  <ul className="product-description__size--btns">
                    {
                      attr?.items.map((elem, i) => (
                        <li style={attr.type === 'swatch' ? { backgroundColor: elem.value } : null}
                          key={i}>
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
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </article>
        </main>
      </div>
    ) : '';
  }
}

function mapStateToProps(state) {
  return {
    currency: state.productsData.activeCurrency,
  };
}

export default connect(mapStateToProps)(DescriptionPage);
