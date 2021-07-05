import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import List from '../components/List';
import RecomendationsDrink from '../components/RecomendationsDrink';
import { requestByDetailsMeal } from '../services/api';
import Icons from '../components/Icons';
import '../styles/global.css';

function FoodDetails() {
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
        { idMeal, strMeal, strInstructions, strYoutube,
          strMealThumb, strCategory, strSource, ...rest },
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
                <Icons code={ item[0] } />
              </section>
              <List array={ array } />
              <h2>Instructions</h2>
              <p
                className="instructions"
                data-testid="instructions"
              >
                { strInstructions }
              </p>
              <h2>Video</h2>
              <iframe
                className="detailVideo"
                data-testid="video"
                src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
                frameBorder="0"
                allowFullScreen
                title="Embedded youtube"
              />
              <h2>Recomendations</h2>
            </div>
            <RecomendationsDrink />
            <div className="recipeBtn">
              <Link to={ `/comidas/${idMeal}/in-progress` }>
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

export default FoodDetails;
