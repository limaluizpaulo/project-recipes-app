import React, { useContext } from 'react';
import RecipesContext from '../Context/RecipesContext';

export default function DoneRecipes() {
  const { favoriteFilters } = useContext(RecipesContext);

  return (
    <main>
      {favoriteFilters.map(({ image, name, id, doneDate }, index) => (
        <div key={ id }>
          <img
            src={ image }
            alt="xxxx"
            data-testid={ `${index}-horizontal-image` }
            width="50px"
          />
          <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
          <p data-testid={ `${index}-horizontal-top-text` }>{ doneDate }</p>
        </div>
      ))}
    </main>
  );
}
