import { Component } from 'react';
import { connect } from 'react-redux';

import './list-page.scss';
import Header from '../Header/Header';
import Element from '../Element/Element';
import { loadProducts } from '../../store/reducers/productsReducer';

class ListPage extends Component {
  componentDidMount() {
    const activeCategory = this.props.category;
    this.props.getProducts(activeCategory);
  }

  componentDidUpdate() {
    // eslint-disable-next-line no-console
    console.log(this.props.products, this.props.categories, this.props.category);
  }

  render() {
    const list = this.props.products;

    return (
      <div>
        <Header/>
        <section className="container">
          <h1>Category name</h1>
          <div className="container__list">
            {
              list.map((item, index) => (
              <Element
                key={index}
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

const mapDispatchToProps = (dispatch) => ({
  getProducts: (activeCategory) => dispatch(loadProducts(activeCategory)),
});

function mapStateToProps(state) {
  return {
    products: state.productsData.productsList,
    category: state.productsData.activeCategory,
    categories: state.productsData.allCategories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
