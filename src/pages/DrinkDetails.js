import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import List from '../components/List';
import RecomendationsMeal from '../components/RecomendationsMeal';
import { requestByDetailsDrink } from '../services/api';
import Icons from '../components/Icons';
import '../styles/global.css';

function DrinkDetails() {
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
          strDrinkThumb, strAlcoholic, strSource, ...rest },
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
              <h2>Recomendations</h2>
            </div>
            <RecomendationsMeal />
            <div className="recipeBtn">
              <Link to={ `/bebidas/${idDrink}/in-progress` }>
                <button
                  type="button"
                  className="startRecipeBtn"
                  data-testid="start-recipe-btn"
                >
                  Iniciar Receita
                </button>
              </Link>
            </div>
          </div>
        );
      }))
  );
}

export default DrinkDetails;
