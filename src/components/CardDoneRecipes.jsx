import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Header from './Header';
import ShareBtn from './ShareBtn';
// import BtnsFilters from './BtnsFilters';
// import DoneAndFavorite from './DoneAndFavorite';

export default function CardDoneRecipes({ item, index }) {
  return (
    <section className="card-done">
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
      <div className="done-right-content">

        <div className="done-name">
          <Link
            to={ item.type === 'comida'
              ? `/comidas/${item.id}` : `/bebidas/${item.id}` }
          >
            <h4
              className="done-item-name"
              data-testid={ `${index}-horizontal-name` }
            >
              {item.name}
            </h4>
          </Link>
          <ShareBtn recipe={ item } index={ index } doneRecipe />

        </div>

        <div className="done-category">
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
        <div className="done-favorite-infos">
          Feita em:
          <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>

          <div className="tags">

            {(item.type === 'comida' ? item.tags.slice(0, 2) : item.tags).map((tag) => (
              <p
                className="tag"
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

CardDoneRecipes.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
