import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import RecipeContext from '../../context/Context';
import { getRecipesDone } from '../../services/helpers/localStorage';

const FoodInProgressBtn = () => {
  const [finished, setFinished] = useState(true);
  const history = useHistory();
  const { ingredients, createObjectFromFood } = useContext(RecipeContext);

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
    const dataToBeStored = createObjectFromFood();
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    dataToBeStored.doneDate = `${day}/${month}/${year}`;
    getRecipesDone(dataToBeStored);
    history.push('/receitas-feitas');
  };

  return (
    <div className="inprogress__finishBtn__container">
      <button
        className={
          finished ? 'inprogress__finishBtn' : 'inprogress__finishBtn-disabled'
        }
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
