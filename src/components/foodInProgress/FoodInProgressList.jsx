import React from 'react';
import useIngredientList from '../../hooks/useIngredientList';
import '../../styles/foodInProgress.css';

const FoodInProgressList = () => {
  const { ingredients, checkIngredient } = useIngredientList();

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
          <input type="checkbox" checked={ checked } onChange={ () => handleCheck(number) } />
          <li className={ checkedClass }>
            {number}
            -
            {' '}
            {ingr}
            {' '}
            -
            {meas}
          </li>
        </div>
      );
    });
  };
  if (ingredients) {
    return (
      <ul className="inProgress__list__container">
        {renderList()}
      </ul>
    );
  }
  return <p>Loading</p>;
};

export default FoodInProgressList;
