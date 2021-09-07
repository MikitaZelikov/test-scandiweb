import { Component } from 'react';
import { connect } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';

import './currenciesDropdown.scss';
import { setCurrency } from '../../store/reducers/generalReducer';
import vectorDown from '../../assets/icons/VectorDown.svg';
import vectorUp from '../../assets/icons/VectorUp.svg';

class CurrenciesDropdown extends Component {
  constructor() {
    super();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  state = {
    isOpened: false,
  }

  toggleDropdownCurrencies = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  handleActivateCurrency = (currency) => {
    this.props.setCurrency(currency);
    this.setState({ isOpened: !this.state.isOpened });
  };

  handleDocumentClick(e) {
    if (e.target.closest('#currensies-dropdown')) return;
    this.setState({ isOpened: false });
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  render() {
    const currencies = this.props.allCurrencies;
    const activeCurrency = getSymbolFromCurrency(this.props.activeCurrency);
    const defaultCurrency = getSymbolFromCurrency(currencies[0]);

    return (
      <div id="currensies-dropdown">
        <div className="header-selection__link" onClick={this.toggleDropdownCurrencies}>
          <p className="header-selection__currency">{activeCurrency || defaultCurrency}</p>
          <img src={this.state.isOpened ? vectorUp : vectorDown} alt="arrow" />
        </div>
        {
          this.state.isOpened ? (
            <ul className="header-selection__dropdown header-selection__dropdown--currencies">
              {
                currencies?.map((currency, index) => (
                  <li key={index} onClick={() => this.handleActivateCurrency(currency)}>
                    {getSymbolFromCurrency(currency)} {currency}
                  </li>
                ))
              }
            </ul>) : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allCurrencies: state.productsData.allCurrencies,
    activeCurrency: state.productsData.activeCurrency,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (currency) => dispatch(setCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesDropdown);
