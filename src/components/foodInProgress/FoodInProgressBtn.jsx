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

  const checkTags = (tag) => {
    if (tag !== null && tag.lenght > 0) {
      return tag.split(',');
    }
    return [];
  };

  const fetchRecipes = async (type, recipeID) => {
    const DOIS = 2;
    const getDate = () => {
      const date = new Date();
      const day = date.getDate().toString().padStart(DOIS, '0');
      const month = (date.getMonth() + 1).toString().padStart(DOIS, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    if (type === 'comidas') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
      const request = await fetch(endpoint);
      const { meals } = await request.json();
      const tag = meals[0].strTags;
      const tags = checkTags(tag);
      const foodObject = {
        id: meals[0].idMeal,
        type,
        area: meals[0].strArea,
        category: meals[0].strCategory,
        alcoholicOrNot: '',
        name: meals[0].strMeal,
        image: meals[0].strMealThumb,
        doneDate: getDate(),
        tags,
      };
      console.log(foodObject); // apagar depois
    } else {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
      const request = await fetch(endpoint);
      const { drinks } = await request.json();
      console.log(drinks[0]); // apagar depois
    }
  };

  useEffect(() => {
    const array = history.location.pathname.split('/');
    const type = array[1];
    const recipeID = array[2];
    fetchRecipes(type, recipeID);
  }, []);

  const handleFinishRecipe = () => {
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
