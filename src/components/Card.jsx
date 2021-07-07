import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export default function Card(props) {
  const { id, thumbnail, title, index } = props;
  const { pathname } = useLocation();

  return (
    <Link
      className="recipe-card meal"
      to={ `${pathname}/${id} ` }
      data-testid={ `${index}-recipe-card` }
    >
      <div>
        <img
          className="recipe-card-thumb"
          src={ thumbnail }
          alt={ title }
          data-testid={ `${index}-card-img` }
        />
        <span
          className="recipe-card-title"
          data-testid={ `${index}-card-name` }
        >
          {title}
        </span>
      </div>
    </Link>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
