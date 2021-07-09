import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserContext from '../context/user.context';
import { setConstants } from '../helpers';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import './DoneRecipesList.css';

function DoneRecipesList({ filter }) {
  const { favorites } = useContext(UserContext);

  const recipes = filter
    ? favorites.filter((item) => item.type === filter)
    : [...favorites];

  return (
    <section className="done-card-list">
      {recipes.map((item, index) => {
        const isDrinks = item.type === 'bebida';
        const { idKey } = setConstants(isDrinks);

        return (
          <div className="done-card" key={ index }>
            <div>
              <Link to={ `/${item.type}s/${item.id}` }>
                <img
                  className="done-card-image"
                  src={ item.image }
                  alt={ item.name }
                />
              </Link>
            </div>
            <div>
              <div>
                <Link to={ `/${item.type}s/${item.id}` }>
                  <span>{item.name}</span>
                </Link>
              </div>
              <div>
                <span>
                  {item.area && `${item.area} - `}
                  {item.category}
                  {item.alcoholicOrNot && ` - ${item.alcoholicOrNot}`}
                </span>
              </div>
              <div className="share-container">
                <FavoriteButton details={ { [idKey]: item.id } } />
                <ShareButton url={ `http://localhost:3000/${item.type}s/${item.id}` } />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

DoneRecipesList.propTypes = {
  filter: PropTypes.string,
}.isRequired;

export default DoneRecipesList;
