import { Component } from 'react';
import { connect } from 'react-redux';

import './list-page.scss';
import Header from '../Header/Header';
import ListProduct from '../List-product/List-product';
import { getProducts, getMixedProducts } from '../../api/api-graphql';

class ListPage extends Component {
  state = {
    products: [],
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.fetchProducts();
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

  render() {
    const { category, isOpened } = this.props;
    const { products } = this.state;

    return (
      <div className="wrapper">
        <Header/>
        <div className="overlay" hidden={!isOpened}></div>
        <section className="container">
          <h1>{category.toUpperCase()}</h1>
          <div className="container__list">
            {
              products?.map((item, index) => (
              <ListProduct
                key={index}
                urlImg={item.gallery[0]}
                { ...item }
              />
              ))
            }
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    category: state.productsData.activeCategory,
    isOpened: state.productsData.dropdownCartIsOpened,
  };
}

export default connect(mapStateToProps)(ListPage);
