import React from 'react';
import useIngredientList from '../../hooks/useIngredientList';

const FoodInProgressList = () => {
  const { ingredients } = useIngredientList();
  const renderList = () => {
    const keys = Object.keys(ingredients);
    return keys.map((key, index) => {
      const { ingr, meas } = ingredients[key];
      return (
        <div
          className="inProgress__listItem__container"
          data-testid={ `${index}-ingredient-step` }
          key={ index }
        >
          <input type="checkbox" />
          <li>
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
