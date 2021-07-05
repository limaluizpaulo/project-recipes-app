import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
  const { id, thumbnail, title } = props;

  return (
    <div data-testid={ `${id}-recipe-card` }>
      <img src={ thumbnail } alt={ title } data-testid={ `${id}-card-img` } />
      <span data-testid={ `${id}-card-name` }>{title}</span>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
