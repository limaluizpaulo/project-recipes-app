import React, { useState, useEffect } from 'react';
import { requestDrinkById } from '../../helpers/requests';
import { useHistory } from "react-router-dom";
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import renderIngredients from './renderIngredients.js';


function DetalhesBebidas() {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

const history = useHistory();
const id = history.location.pathname;;

useEffect(() => {
  (async function resolved() {
    const resolve = await requestDrinkById(id.substring(9));
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

function AlcoholVerify(item) {
  if(item.strAlcoholic) {
    return <h5 data-testid="recipe-category">{item.strAlcoholic}</h5>
  }
}

function mapData(param) {
  const { drinks } = param;
  return drinks
    .map((item, index) => {
      const path = `/bebidas/${item.idDrink}`;
      if( path === history.location.pathname) {
        return(
          <>
            <img src={item.strDrinkThumb} data-testid="recipe-photo" />
            <h3 data-testid="recipe-title">{item.strDrink}</h3>
            {renderButtons()}
            {AlcoholVerify(item)}
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

export default DetalhesBebidas;
