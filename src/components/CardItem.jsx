import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardItem extends Component {
  render() {
    const { name, image, index } = this.props;
    return (
      <div
        data-testid={ `${index}-recipe-card` }
        className="card-item"
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ image }
          alt={ name }
          width="130px"
        />
        <h5 data-testid={ `${index}-card-name` }>{name}</h5>
      </div>
    );
  }
}

CardItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardItem;
