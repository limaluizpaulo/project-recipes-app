import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserContext from '../context/user.context';
import ShareButton from './ShareButton';
import './DoneRecipesList.css';

function DoneRecipesList({ filter }) {
  const { done } = useContext(UserContext);

  const recipes = filter
    ? done.filter((item) => item.type === filter)
    : [...done];

  return (
    <section className="done-card-list">
      {recipes.map((item, index) => (
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
                { item.area && `${item.area} - `}
                { item.category }
                { item.alcoholicOrNot && ` - ${item.alcoholicOrNot}` }
              </span>
            </div>
            <div>
              <span>{item.doneDate}</span>
            </div>
            <div>
              {item.tags.map((tagName, tagIndex) => (
                <span key={ tagIndex }>{tagName}</span>
              ))}
            </div>
            <div className="share-container">
              <ShareButton
                index={ index }
                url={ `http://localhost:3000/${item.type}s/${item.id}` }
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

DoneRecipesList.propTypes = {
  filter: PropTypes.string,
}.isRequired;

export default DoneRecipesList;
