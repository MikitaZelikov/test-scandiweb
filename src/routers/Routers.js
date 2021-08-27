import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ListPage from '../components/List-page/List-page';
import DescriptionPage from '../components/Description-page/Description-page';
import CartPage from '../components/Cart-page/Cart-page';
// import CartOverlay from '../components/Cart-overlay/Cart-overlay';

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact>
          <ListPage />
        </Route>
        <Route path='/description' exact>
          <DescriptionPage />
        </Route>
        <Route path='/cart' exact>
          <CartPage />
        </Route>
        {/* <Route path='/cart-overlay' exact>
          <CartOverlay />
        </Route> */}
      </Switch>
    );
  }
}

export default Routers;
