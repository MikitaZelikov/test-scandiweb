import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import Routers from './routers/Routers';
import { loadInitData } from './store/reducers/generalReducer';

class App extends Component {
  componentDidMount() {
    this.props.loadInitData();
  }

  render() {
    const { initialDataIsLoading } = this.props;
    return initialDataIsLoading ? 'Loading...' : (
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialDataIsLoading: state.productsData.initialDataIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadInitData: () => dispatch(loadInitData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
