import React, { useContext } from 'react';
import RecipeContext from '../../context/Context';
import useIngredientList from '../../hooks/useIngredientList';
import '../../styles/foodInProgress.css';

const FoodInProgressList = () => {
  const { checkIngredient } = useIngredientList();
  const { ingredients } = useContext(RecipeContext);

  const handleCheck = (ingrLocation) => {
    checkIngredient(ingrLocation);
  };
  const renderList = () => {
    const keys = Object.keys(ingredients);
    return keys.map((key, index) => {
      const { ingr, meas, checked } = ingredients[key];
      const number = index + 1;
      const checkedClass = checked ? 'inProgress__listItem__checked' : '';
      return (
        <div
          className="inProgress__listItem__container"
          data-testid={ `${index}-ingredient-step` }
          key={ index }
        >
          <input
            type="checkbox"
            checked={ checked }
            onChange={ () => handleCheck(number) }
          />
          <li className={ checkedClass }>
            <span className="inProgress__ingredientItem">
              {ingr}
              {' '}
              -
              {' '}
              {meas}
            </span>
          </li>
        </div>
      );
    });
  };
  if (ingredients) {
    return (
      <div className="ingredientsList">
        <h2 className="ingredientsList__title">Ingredients</h2>
        <ul className="inProgress__list__container">
          {renderList()}
        </ul>
      </div>
    );
  }
  return <p>Loading</p>;
};

export default FoodInProgressList;
