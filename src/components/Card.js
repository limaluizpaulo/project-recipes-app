import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Card({ index, imgSrc, name, path }) {
  const history = useHistory();

  return (
    <button
      type="button"
      className="card"
      onClick={ () => history.push(path) }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        className="card-image"
        src={ imgSrc }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </button>
  );
}

Card.propTypes = {
  index: PropTypes.number,
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  path: PropTypes.string,
}.isRequired;

export default Card;
