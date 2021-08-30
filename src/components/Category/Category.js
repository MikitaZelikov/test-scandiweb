import { Component } from 'react';
import { connect } from 'react-redux';

import { toggleCategory } from '../../store/reducers/productsReducer';
import './category.scss';

class Category extends Component {
  handleClick = (e) => {
    e.preventDefault();
    const activeCategory = e.target.textContent;
    this.props.setActiveCategory(activeCategory);
  };

  // componentDidUpdate() {

  // }

  render() {
    return (
      <a href="#" className="header-nav__link" onClick={this.handleClick}>
        {this.props.text.toUpperCase()}
      </a>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setActiveCategory: (activeCategory) => {
    dispatch(toggleCategory(activeCategory));
  },
});

export default connect(null, mapDispatchToProps)(Category);
