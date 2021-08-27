import { Component } from 'react';
import { connect } from 'react-redux';

import { loadProducts } from '../../store/reducers/productsReducer';
import './category.scss';

class Category extends Component {
  handleClick = () => {

  };

  render() {
    return (
      <a href="/" className="header-nav__link" onClick={this.handleClick}>
        {this.props.text.toUpperCase()}
      </a>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: (activeCategory) => dispatch(loadProducts(activeCategory)),
});

export default connect(mapDispatchToProps)(Category);
