import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import List from '../components/List';
import { requestByDetailsDrink } from '../services/api';
import Icons from '../components/Icons';
import Loading from '../components/Loading';
import '../styles/DrinkAndFoodProcess(page).css';

const returnArrayOfIngredients = (object) => {
  const maxIngredients = 15;
  const arrayOfIngredients = [];
  for (let i = 1; i <= maxIngredients; i += 1) {
    const ingredientToPush = `strIngredient${i}`;
    if (object[ingredientToPush] !== null && object[ingredientToPush] !== '') {
      arrayOfIngredients.push(object[ingredientToPush]);
    }
  }
  return arrayOfIngredients;
};

function DrinkProcess() {
  const params = useParams();
  const [drink, setDrink] = useState([]);
  const [loading, setLoading] = useState(null);
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;
  const { id: drinkId } = useParams();

  function doneStructure() {
    if (drink[0] !== undefined) {
      const
        { idDrink,
          strArea,
          id,
          strCategory,
          strDrink,
          strDrinkThumb,
          strTags, strAlcoholic } = drink[0];

      const doneElement = {
        id: idDrink || id,
        type: 'bebida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: dataAtual,
        tags: strTags === null ? null : strTags.split(','),
      };
      return doneElement;
    }
  }

  function returnIngredientsUsed() {
    const inLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inLocalStorage) return inLocalStorage.cocktails[drinkId];
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
    setLoading(true);
    const request = async () => {
      const result = await requestByDetailsDrink(params.id);
      setDrink(result.drinks);
      setLoading(false);
    };
    request();
  }, [params.id]);

  if (loading) return <Loading />;
  return (
    drink && (
      drink.map((
        { idDrink, strDrink, strInstructions,
          strDrinkThumb, strAlcoholic, ...rest },
        index,
      ) => {
        const drinks = rest;
        const arrayOfIngredients = returnArrayOfIngredients(drinks);
        return (
          <div key={ index }>
            <img
              src={ strDrinkThumb }
              className="progress-img"
              alt={ strDrink }
              data-testid="recipe-photo"
            />
            <div className="progress-align">
              <section className="progressTitle-container">
                <div>
                  <h1
                    className="progress-title"
                    data-testid="recipe-title"
                  >
                    { strDrink }
                  </h1>
                  <span data-testid="recipe-category">{strAlcoholic}</span>
                </div>
                <Icons code={ drink[0] } />
              </section>
              <List
                ingredientsUsed={ ingredientsUsed }
                updateIngredientsUsed={ updateIngredientsUsed }
                idMeal={ drinkId }
                drinks={ drinks }
              />
              <h2>Instructions</h2>
              <p
                className="progress-instructions"
                data-testid="instructions"
              >
                { strInstructions }
              </p>
            </div>
            <Link to="/receitas-feitas">
              <button
                type="button"
                onClick={ processDone }
                className="progress-startRecipeBtn"
                data-testid="finish-recipe-btn"
                disabled={ arrayOfIngredients.length !== ingredientsUsed.length }
              >
                Finalizar Receita
              </button>
            </Link>
          </div>
        );
      }))
  );
}

export default DrinkProcess;
