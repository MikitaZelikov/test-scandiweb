import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCategory } from '../../store/reducers/generalReducer';
import './tab.scss';

class Tab extends Component {
  handleClick = (e) => {
    const selectedCategory = e.target.textContent.toLowerCase();
    this.props.setCategory(selectedCategory);
  };

  render() {
    const { text, activeCategory } = this.props;
    const categoryClass = 'header-nav__link';
    const activeCategoryClass = 'header-nav__link header-nav__link--active';

    return (
      <Link to='/'
      className={activeCategory === text ? activeCategoryClass : categoryClass}
        onClick={this.handleClick}>
        {text.toUpperCase()}
      </Link>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCategory: (selectCategory) => dispatch(setCategory(selectCategory)),
});

function mapStateToProps(state) {
  return {
    activeCategory: state.productsData.activeCategory,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
