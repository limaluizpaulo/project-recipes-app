import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import List from '../components/List';
import { requestByDetailsDrink } from '../services/api';
import Icons from '../components/Icons';
import '../styles/global.css';

function DrinkProcess() {
  const params = useParams();
  const [drink, setDrink] = useState([]);
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;

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
      const result = await requestByDetailsDrink(params.id);
      setDrink(result.drinks);
    };
    request();
  }, [params.id]);

  return (
    drink && (
      drink.map((
        { idDrink, strDrink, strInstructions,
          strDrinkThumb, strAlcoholic, ...rest },
        index,
      ) => {
        const drinks = rest;
        return (
          <div key={ index }>
            <img
              src={ strDrinkThumb }
              className="detailImg"
              alt={ strDrink }
              data-testid="recipe-photo"
            />
            <div className="alignDetailsItens">
              <section className="detailsTitle-container">
                <div>
                  <h1 className="recipeTitle" data-testid="recipe-title">{ strDrink }</h1>
                  <span data-testid="recipe-category">{strAlcoholic}</span>
                </div>
                <Icons code={ drink[0] } />
              </section>
              <List drinks={ drinks } />
              <h2>Instructions</h2>
              <p
                className="instructions"
                data-testid="instructions"
              >
                { strInstructions }
              </p>
            </div>
            <Link to="/receitas-feitas">
              <button
                type="button"
                onClick={ processDone }
                className="startRecipeBtn"
                data-testid="finish-recipe-btn"
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
