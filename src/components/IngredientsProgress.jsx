import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFromLocalStorage, setOnLocalStorage } from '../services/helpers/localStorage';
import { UserContext } from '../context/UserProvider';

const IngredientsProgress = ({ newObj }) => {
  const { type, ingredients, measures, id } = newObj;
  const { inProgressRecipes,
    setInProgressRecipes } = useContext(UserContext);

  const handleProgress = () => {
    setInProgressRecipes(
      {
        ...inProgressRecipes,
        [type]: {
          ...inProgressRecipes[type],
          [id]: [...ingredients],
        },
      },
    );
  };

  const [ingredientsChecked, setIngredientsChecked] = useState(ingredients
    .reduce((oldState, newIngredient) => {
      const progressLocal = setOnLocalStorage('inProgressRecipes');
      handleProgress();
      if ((progressLocal !== null)
      && (progressLocal[type] !== undefined)
      && (progressLocal[type][id] !== undefined)) {
        oldState = {
          ...oldState,
          [newIngredient]: progressLocal[type][id]
            .some((ingredientChecked) => newIngredient === ingredientChecked),
        };
      }
      return oldState;
    }, {}));

  useEffect(() => {
    getFromLocalStorage('inProgressRecipes');
  }, [inProgressRecipes]);

  const handleLocalStorage = ({ target: { name } }) => {
    const storageProgress = getFromLocalStorage('inProgressRecipes');
    const localProgress = storageProgress[type][id]
      .some((ingredient) => ingredient === name);
    setIngredientsChecked((prevState) => ({
      ...prevState,
      [name]: !ingredientsChecked[name],
    }));
    if (localProgress) {
      inProgressRecipes[type][id] = inProgressRecipes[type][id]
        .filter((ingredient) => ingredient !== name);
      setOnLocalStorage('inProgressRecipes', storageProgress);
      return;
    }
    storageProgress.push(name);
    setOnLocalStorage('inProgressRecipes', storageProgress);
  };

  return (
    <section>
      <h3>Ingredients</h3>
      <ol>
        {ingredients && ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <input
              type="checkbox"
              name={ ingredient }
              checked={ inProgressRecipes[ingredients] }
              onChange={ (event) => handleLocalStorage(event) }
            />
            {`- ${ingredient} ${measures[index]}`}
          </li>
        ))}
      </ol>
    </section>
  );
};
// setOnlocalStorage('inProgressRecipes', inProgressRecipes);
// JSON.parse(localStorage.getItem('state'));
IngredientsProgress.propTypes = {
  ingredients: PropTypes.string,
  obj: PropTypes.object,
}.isRequired;

export default IngredientsProgress;
