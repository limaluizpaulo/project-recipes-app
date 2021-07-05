import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({ recipe, index }) {
  // const history = useHistory();
  // const {
  //   image,
  //   category,
  //   name,
  //   doneDate,
  //   tags,
  //   id,
  //   area,
  //   alcoholicOrNot,
  //   type,
  // } = recipe;

  return (
    <div>
      oi
       { console.log(recipe) }
{/*       
      { recipe.length > 0 && (
        <>
          <button
            type="button"
            onClick={ () => history.push(`/${type}s/${id}`) }
          >
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
            />
          </button>
          <Link to={ `/${type}s/${id}` }>
            <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
          </Link>
          { type === 'comida' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { category }
              { area }
            </p>)
            : (
              <p>
                { alcoholicOrNot }
              </p>
            )}
          <p data-testid={ `${index}-horizontal-done-date` }>
            { doneDate }
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img
              src={ shareIcon }
              alt={ name }
            />
          </button>
          { type === 'comida' && tags.map((tag) => (
            <p
              key={ index }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          ))}
        </>
      )}  */}
    </div>

  );
}

export default DoneRecipeCard;

DoneRecipeCard.propTypes = {
  recipe: PropTypes.objectOf.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
