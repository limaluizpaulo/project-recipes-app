import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import RecipeContext from '../../context/Context';

const FoodInProgressBtn = () => {
  const [finished, setFinished] = useState(true);
  const history = useHistory();
  const { ingredients } = useContext(RecipeContext);
  useEffect(() => {
    const checkIfIsFinished = () => {
      const keys = Object.keys(ingredients);
      const ingredientsQuantity = keys.length;
      let checkedQuantity = 0;
      keys.forEach((key) => {
        if (ingredients[key].checked) checkedQuantity += 1;
      });
      if (checkedQuantity === ingredientsQuantity) {
        setFinished(true);
      } else {
        setFinished(false);
      }
    };
    checkIfIsFinished();
  }, [ingredients]);

  const handleFinishRecipe = () => {
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ !finished }
        onClick={ handleFinishRecipe }
      >
        Finalizar
      </button>
    </div>
  );
};

export default FoodInProgressBtn;
