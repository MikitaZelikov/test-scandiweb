import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PDP from '../components/PDP/PDP';
import PLP from '../components/PLP/PLP';
import CartPage from '../components/Cart-page/Cart-page';
import CartOverlay from '../components/Cart-overlay/Cart-overlay';

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact>
          <PLP />
        </Route>
        <Route path='/description' exact>
          <PDP />
        </Route>
        <Route path='/cart' exact>
          <CartPage />
        </Route>
        <Route path='/cart-overlay' exact>
          <CartOverlay />
        </Route>
      </Switch>
    );
  }
}

export default Routers;
