import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../components/List';
import RecomendationsDrink from '../components/RecomendationsDrink';
import { requestByDetailsMeal } from '../services/api';

function FoodDetails() {
  const params = useParams();
  const [item, setItem] = useState([]);

  useEffect(() => {
    const request = async () => {
      const result = await requestByDetailsMeal(params.id);
      setItem(result.meals);
    };
    request();
  }, []);

  return (
    item && (
      item.map((
        { strMeal, strInstructions, strYoutube,
          strMealThumb, strCategory, strSource, ...rest },
        index,
      ) => {
        const array = rest;
        return (
          <div key={ index }>
            <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
            <section>
              <div>
                <h1 data-testid="recipe-title">{ strMeal }</h1>
                <span data-testid="recipe-category">{ strCategory }</span>
              </div>
              <div>
                <img src="" alt="" data-testid="share-btn" />
                {' '}
                Compartilhar
                <img src="" alt="" data-testid="favorite-btn" />
                {' '}
                FAVORITAR
              </div>
            </section>
            <List array={ array } />
            <h2>Instructions</h2>
            <span data-testid="instructions">{ strInstructions }</span>
            <h2>Video</h2>
            <iframe
              width="853"
              height="480"
              data-testid="video"
              src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
              frameBorder="0"
              allow="accelerometer; autoplay;
            clipboard-write;
            encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
            <h2>Recomendations</h2>
            <RecomendationsDrink />
            <button type="button" data-testid="start-recipe-btn">
              Iniciar Receita
            </button>
          </div>
        );
      }))
  );
}

export default FoodDetails;
