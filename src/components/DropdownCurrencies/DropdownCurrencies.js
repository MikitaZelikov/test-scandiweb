import { Component } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';

import './dropdownCurrencies.scss';

class DropdownCurrencies extends Component {
  render() {
    const { currencies, handleActivateCurrency } = this.props;
    return (
      <ul className="header-selection__dropdown header-selection__dropdown--currencies">
        {
          currencies?.map((currency, index) => (
            <li key={index} onClick={() => handleActivateCurrency(currency)}>
              {getSymbolFromCurrency(currency)} {currency}
            </li>
          ))
        }
      </ul>
    );
  }
}

export default DropdownCurrencies;
