import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ListPage from '../components/List-page/List-page';
import DescriptionPage from '../components/Description-page/Description-page';
import CartPage from '../components/Cart-page/Cart-page';
// import CartOverlay from '../components/Cart-overlay/Cart-overlay';

class Routers extends Component {
  render() {
    const { dropdownCartIsOpened } = this.props;

    return (
      <Switch>
        <Route path='/' exact>
          <ListPage isOpened={dropdownCartIsOpened}/>
        </Route>
        <Route path='/product/:id' exact>
          <DescriptionPage isOpened={dropdownCartIsOpened}/>
        </Route>
        <Route path='/cart' exact>
          <CartPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  dropdownCartIsOpened: state.productsData.dropdownCartIsOpened,
});

export default connect(mapStateToProps)(Routers);
