import { Component } from 'react';
import { connect } from 'react-redux';

import './list-page.scss';
import Header from '../Header/Header';
import Element from '../Element/Element';
import { getProducts } from '../../api/api-graphql';

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
    const products = await getProducts(category);
    this.setState((prevState) => ({
      ...prevState,
      products,
    }));
  }

  render() {
    const { category } = this.props;
    const { products } = this.state;

    return (
      <div>
        <Header/>
        <section className="container">
          <h1>{category.toUpperCase()}</h1>
          <div className="container__list">
            {
              products?.map((item, index) => (
              <Element
                key={index}
                id={item.id}
                inStock={item.inStock}
                urlImg={item.gallery[0]}
                name={item.name}
                prices={item.prices}
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
  };
}

export default connect(mapStateToProps)(ListPage);
