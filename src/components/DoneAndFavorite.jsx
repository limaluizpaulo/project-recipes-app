import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function DoneAndFavorite({ item, index }) {
  return (
    <section className="">
      <div className="done-favorite img">
        <Link
          to={ item.type === 'comida'
            ? `/comidas/${item.id}` : `/bebidas/${item.id}` }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ item.image }
            alt="avatar"
            className="recipe-card-img"
          />
        </Link>
      </div>
      <div className="">
        <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>

        {item.type === 'comida' ? (
          <p data-testid={ `${index}-horizontal-top-text` }>
            {item.area}
            {' '}
            -
            {' '}
            {item.category}
          </p>
        ) : (
          <p data-testid={ `${index}-horizontal-top-text` }>
            {item.alcoholicOrNot}
          </p>
        )}
      </div>
    </section>
  );
}

DoneAndFavorite.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
