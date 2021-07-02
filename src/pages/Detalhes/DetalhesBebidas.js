import React, { useState, useEffect } from 'react';
import { requestDrinkById, requestMeal } from '../../helpers/requests';
import { useHistory } from "react-router-dom";
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import renderIngredients from './renderIngredients.js';


function DetalhesBebidas() {
const [data, setData] = useState([]);
const [recomm, setRecomm] = useState([]);
const [loading, setLoading] = useState(true);

const history = useHistory();
const id = history.location.pathname;;

useEffect(() => {
  (async function resolved() {
    const resolve = await requestDrinkById(id.substring(9));
    const resolveRecomm = await requestMeal();
    setData(resolve);
    setRecomm(resolveRecomm);
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

function mapRecomm(param) {
  const { meals } = param;
  const magicNumber = 6;
  return meals
    .filter((_, index) => index < magicNumber)
    .map((item, index) => (
      <div key={ index } data-testid={`${index}-recomendation-card`}>
        <img
          data-testid={ `${index}-card-img` }
          src={ item.strMealThumb }
          alt={ `imagem de ${item}` }
          id={item.idMeal}
        />
        <p data-testid={ `${index}-recomendation-title` }>{item.strMeal}</p>
      </div>
    ));
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
            <label>
              Recomendações:
              {mapRecomm(recomm)}
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
