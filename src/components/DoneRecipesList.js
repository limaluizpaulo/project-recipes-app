import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import UserContext from '../context/user.context';
import ShareButton from './ShareButton';
import './DoneRecipesList.css';

function DoneRecipesList({ filter }) {
  // const { done } = useContext(UserContext);

  const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const recipes = filter
    ? done.filter((item) => item.type === filter)
    : [...done];

  return (
    <div className="done-card-list">
      {recipes.map((item, index) => (
        <div className="done-card" key={ index }>
          <div>
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                className="done-card-image"
                src={ item.image }
                alt={ item.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>
          <div>
            <div>
              <Link to={ `/${item.type}s/${item.id}` }>
                <span data-testid={ `${index}-horizontal-name` }>
                  {item.name}
                </span>
              </Link>
            </div>
            <div>
              <span data-testid={ `${index}-horizontal-top-text` }>
                { item.area && `${item.area} - `}
                { item.category }
                {item.type === 'bebida' && ` - ${item.alcoholicOrNot}`}
              </span>
            </div>
            <div>
              <span data-testid={ `${index}-horizontal-done-date` }>
                {item.doneDate}
              </span>
            </div>
            <div>
              {item.tags.map((tagName, tagIndex) => (
                <span
                  key={ tagIndex }
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                >
                  {tagName}
                </span>
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
    </div>
  );
}

DoneRecipesList.propTypes = {
  filter: PropTypes.string,
}.isRequired;

export default DoneRecipesList;
