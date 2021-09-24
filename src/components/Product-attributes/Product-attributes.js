import { Component } from 'react';

class ProductAttributes extends Component {
  render() {
    const { attribute } = this.props;

    return (
      <div className="product-description__size">
        <p className="product-description__size--title">
          {`${attribute.name}:`}
        </p>
        <ul className="product-description__size--btns">
          {
            attribute?.items.map((elem, i) => (
              <li
                key={i}
                className={selectedAttributes[attribute.name]?.value === elem.value
                  ? 'selected' : null}
                style={attribute.type === 'swatch' ? { backgroundColor: elem.value } : null}
                onClick={() => this.handleSelectedOption(
                  attribute.name,
                  attribute.type,
                  elem.value)}>
                {attribute.type === 'swatch' ? '' : elem.value}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default ProductAttributes;
