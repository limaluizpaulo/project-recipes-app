import React from 'react';
import './CardsRecipes.css';

function CardsRecipesFavorite({ aux, index }) {
  console.log(aux);
  console.log(index);
  const { image, name, category } = aux;
  console.log(image);
  console.log(name);
  return (
    <div>
      <div>
        <img
          className="img-tam"
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          alt="..."
        />
      </div>
      <div>
        <div>
          <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
          <h5
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </h5>
          <p
            className="card-text"
          /* data-testid="${index}-horizontal-done-date" */
          >
            Data
          </p>
          <button
            type="button"
            disabled
          /* data-testid="${index}-${tagName}-horizontal-tag" */
          >
            Tags
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardsRecipesFavorite;
