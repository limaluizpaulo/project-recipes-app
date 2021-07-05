import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import List from '../components/List';
import { requestByDetailsDrink } from '../services/api';
import Icons from '../components/Icons';
import '../styles/global.css';

function DrinkProcess() {
  const params = useParams();
  const [drink, setDrink] = useState([]);

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
                  <h1 data-testid="recipe-title">{ strDrink }</h1>
                  <span data-testid="recipe-category">{strAlcoholic}</span>
                </div>
                <Icons />
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
