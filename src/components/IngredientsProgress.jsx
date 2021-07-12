import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { updateLocalStorage,
  getFromLocalStorage, removeFromLocalStorage } from '../services/helpers/localStorage';
import { UserContext } from '../context/UserProvider';

const IngredientsProgress = ({ newObj }) => {
  const { type, ingredients, measures, id } = newObj;
  // const [done, setDone] = useState([localStorage]);
  const { inProgressRecipes, handleProgress } = useContext(UserContext);
  // const [inProgressRecipes, setinProgressRecipes] = useContext(ashuasha)

  useEffect(() => {
    getFromLocalStorage('inProgressRecipes');
  }, [inProgressRecipes]);

  const handleLocalStorage = () => {
    (type === 'comida' ? 'meals' : 'cocktails');
    const itemsSelected = getFromLocalStorage('inProgressRecipes');
    if (itemsSelected.type[id] === id) {
      removeFromLocalStorage(
        'inProgressRecipes'.type.id,
      );
    }
    updateLocalStorage('inProgressRecipes', type.id);
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
              checked={ () => handleLocalStorage() }
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
