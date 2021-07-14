import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import List from '../components/List';
import { requestByDetailsMeal } from '../services/api';
import Icons from '../components/Icons';
import '../styles/DrinkAndFoodProcess(page).css';

const returnArrayOfIngredients = (object) => {
  const maxIngredients = 20;
  const arrayOfIngredients = [];
  for (let i = 1; i <= maxIngredients; i += 1) {
    const ingredientToPush = `strIngredient${i}`;
    if (object[ingredientToPush] !== '' && object[ingredientToPush] !== null) {
      arrayOfIngredients.push(object[ingredientToPush]);
    }
  }
  return arrayOfIngredients;
};

function FoodProcess() {
  const params = useParams();
  const [item, setItem] = useState([]);
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;

  function doneStructure() {
    if (item[0] !== undefined) {
      const
        { idMeal,
          strArea,
          id,
          strCategory,
          strMeal, strMealThumb, strTags } = item[0];

      const doneElement = {
        id: idMeal || id,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: dataAtual,
        tags: strTags === null ? null : strTags.split(','),
      };
      return doneElement;
    }
  }

  const { id } = useParams();

  function returnIngredientsUsed() {
    const inLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inLocalStorage) return inLocalStorage.meals[id];
    return [];
  }

  const [ingredientsUsed, setIngredientsUsed] = useState(returnIngredientsUsed());

  function updateIngredientsUsed() {
    setIngredientsUsed(returnIngredientsUsed());
  }

  function processDone(changeIcon) {
    let done = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneElement = doneStructure();
    if (changeIcon) {
      done = [...done, doneElement];
      localStorage.setItem('doneRecipes', JSON.stringify(done));
    }
  }

  useEffect(() => {
    const request = async () => {
      const result = await requestByDetailsMeal(params.id);
      setItem(result.meals);
    };
    request();
  }, [params.id]);
  return (
    item && (
      item.map((
        { idMeal, strMeal, strInstructions,
          strMealThumb, strCategory, ...rest },
        index,
      ) => {
        const array = rest;
        const arrayOfIngredients = returnArrayOfIngredients(array);
        console.log(arrayOfIngredients);
        console.log(ingredientsUsed);
        return (
          <div className="food-progress-main-div" key={ index }>
            <div className="progress-align">
              <img
                src={ strMealThumb }
                className="progress-img"
                alt={ strMeal }
                data-testid="recipe-photo"
              />
              <section className="progressTitle-container">
                <div>
                  <h1
                    className="progress-title"
                    data-testid="recipe-title"
                  >
                    { strMeal }
                  </h1>
                </div>
                <Icons code={ item[0] } />
              </section>
              <Badge variant="info" data-testid="recipe-category">{ strCategory }</Badge>
              <List
                array={ array }
                ingredientsUsed={ ingredientsUsed }
                updateIngredientsUsed={ updateIngredientsUsed }
                idMeal={ id }
              />
              <h2 className="section-title">Instructions</h2>
              <p
                className="progress-instructions"
                data-testid="instructions"
              >
                { strInstructions }
              </p>
            </div>
            <Link to="/receitas-feitas">
              <Button
                variant="info"
                type="button"
                onClick={ processDone }
                className="progress-startRecipeBtn"
                data-testid="finish-recipe-btn"
                disabled={ arrayOfIngredients.length !== ingredientsUsed.length }
              >
                Finalizar Receita
              </Button>
            </Link>
          </div>
        );
      }))
  );
}

export default FoodProcess;
