import React, { useState, useEffect } from 'react';
import { requestMealById } from '../../helpers/requests';
import { useHistory } from "react-router-dom";
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import renderIngredients from './renderIngredients.js';


function DetalhesComidas() {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

const history = useHistory();
const id = history.location.pathname;

useEffect(() => {
  (async function resolved() {
    const resolve = await requestMealById(id.substring(9));
    setData(resolve);
    setLoading(false);
  }());
}, []);

function renderButtons() {
  return (
    <>
      <button type="button">
        <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
      </button>
      <button type="button">
        <img src={ whiteHeartIcon } alt="favorite icon" data-testid="favorite-btn" />
      </button>
    </>
  )
}

function mapData(param) {
  const { meals } = param;
  return meals
    .map((item, index) => {
      const path = `/comidas/${item.idMeal}`;
      if( path === history.location.pathname) {
        return(
          <>
            <img src={item.strMealThumb} data-testid="recipe-photo" />
            <h3 data-testid="recipe-title">{item.strMeal}</h3>
            {renderButtons()}
            <h5 data-testid="recipe-category">{item.strCategory}</h5>
            <label htmlFor="ingredients-list">
              Ingredientes:
              <ul id="ingredients-list">
                {renderIngredients(item)}
              </ul>
            </label>
            <label htmlFor="instructions">
              Instruções de preparo:
              <p data-testid="instructions">{item.strInstructions}</p>
            </label>
            <embed  /> 
            <label htmlFor="video">
              Vídeo:
              <video data-testid="video" src={item.strYoutube}></video>
            </label>
            <label>
              Recomendações:
              <span data-testid={`${index}-recomendation-card`}>{item.strDrinkAlternate}</span>
            </label>
            <button data-testid="start-recipe-btn">Iniciar Receita</button>
          </>
        )        
      }
    });
}

  return(
    <div className="card-meals">
      {
        loading
          ? 'Carregando...'
          : (mapData(data))
      }
    </div>    
  )
}

export default DetalhesComidas;
