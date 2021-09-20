import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ListPage from '../components/List-page/List-page';
import DescriptionPage from '../components/Description-page/Description-page';
import CartPage from '../components/Cart-page/Cart-page';

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact>
          <ListPage/>
        </Route>
        <Route path='/product/:id' exact>
          <DescriptionPage/>
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

export default Routers;
