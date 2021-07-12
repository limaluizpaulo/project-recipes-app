import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { updateLocalStorage,
  getFromLocalStorage } from '../services/helpers/localStorage';
import { UserContext } from '../context/UserProvider';

const IngredientsProgress = ({ newObj }) => {
  const { type, ingredients, measures, id } = newObj;
  const [done, setDone] = useState([localStorage]);
  const { inProgressRecipes } = useContext(UserContext);
  // const [inProgressRecipes, setinProgressRecipes] = useContext(ashuasha)

  useEffect(() => {
    getFromLocalStorage('inProgressRecipes');
  }, [inProgressRecipes]);

  const handleLocalStorage = ({ target: { className } }) => {
    if (className.includes('done')) {
      progressRecipes(type, id);
      updateLocalStorage('inProgressRecipes', inProgressRecipes);
    }
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
              className={ done ? 'done' : '' }
              onClick={ (event) => {
                setDone(!done);
                { () => handleLocalStorage(event); }
              } }
            />
            {`- ${ingredient} ${measures[index]}`}
          </li>
        ))}
      </ol>
    </section>
  );
};
setOnlocalStorage('inProgressRecipes', inProgressRecipes);
// JSON.parse(localStorage.getItem('state'));
IngredientsProgress.propTypes = {
  ingredients: PropTypes.string,
  obj: PropTypes.object,
}.isRequired;

export default IngredientsProgress;
