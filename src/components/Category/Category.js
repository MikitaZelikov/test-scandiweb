import { Component } from 'react';
import { connect } from 'react-redux';

import { loadProducts } from '../../store/reducers/productsReducer';
import './category.scss';

class Category extends Component {
  handleClick = (e) => {
    e.preventDefault();
    const selectCategory = e.target.textContent.toLowerCase();
    this.props.getProducts(selectCategory);
  };

  render() {
    const { text, activeCategory } = this.props;
    const categoryClass = 'header-nav__link';
    const activeCategoryClass = 'header-nav__link header-nav__link--active';

    return (
      <a href="#" className={activeCategory === text ? activeCategoryClass : categoryClass}
        onClick={this.handleClick}>
        {text.toUpperCase()}
      </a>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: (selectCategory) => dispatch(loadProducts(selectCategory)),
});

function mapStateToProps(state) {
  return {
    activeCategory: state.productsData.activeCategory,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
