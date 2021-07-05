import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import List from '../components/List';
import { requestByDetailsMeal } from '../services/api';
import Icons from '../components/Icons';
import '../styles/global.css';

function FoodProcess() {
  const params = useParams();
  const [item, setItem] = useState([]);

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
        return (
          <div key={ index }>
            <img
              src={ strMealThumb }
              className="detailImg"
              alt={ strMeal }
              data-testid="recipe-photo"
            />
            <div className="alignDetailsItens">
              <section className="detailsTitle-container">
                <div>
                  <h1 data-testid="recipe-title">{ strMeal }</h1>
                  <span data-testid="recipe-category">{ strCategory }</span>
                </div>
                <Icons />
              </section>
              <List array={ array } />
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

export default FoodProcess;
