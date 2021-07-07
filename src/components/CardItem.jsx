import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardItem extends Component {
  render() {
    const { name, image, index, id } = this.props;
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <Link
          to={ `/comidas/${id}` }
        >
          <h5 data-testid={ `${index}-card-name` }>{name}</h5>
          <img
            data-testid={ `${index}-card-img` }
            src={ image }
            alt={ name }
            width="30px"
          />
        </Link>
      </div>
    );
  }
}

CardItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default CardItem;
