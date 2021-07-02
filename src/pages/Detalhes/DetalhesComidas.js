import React, { useState, useEffect } from 'react';
import { requestDrink, requestMealById } from '../../helpers/requests';
import { useHistory } from "react-router-dom";
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import renderIngredients from './renderIngredients.js';
// import Recommendation from './Recommendations';

//  Fonte do método substring(): https://www.devmedia.com.br/javascript-substring-selecionando-parte-de-uma-string/39232#:~:text=O%20m%C3%A9todo%20substring()%20retorna,%22%3B%20var%20resultado%20%3D%20stringExemplo.

function DetalhesComidas() {
const [data, setData] = useState([]);
const [recomm, setRecomm] = useState([]);
const [loading, setLoading] = useState(true);

const history = useHistory();
const id = history.location.pathname;

useEffect(() => {
  (async function resolved() {
    const resolve = await requestMealById(id.substring(9));
    const resolveRecomm = await requestDrink();
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

function mapRecomm(param) {
  const { drinks } = param;
  const magicNumber = 6;
  return drinks
    .filter((_, index) => index < magicNumber)
    .map((item, index) => (
      <div key={ index } data-testid={`${index}-recomendation-card`}>
        <img
          data-testid={ `${index}-card-img` }
          src={ item.strDrinkThumb }
          alt={ `imagem de ${item}` }
          id={item.idDrink}
        />
        <p data-testid={ `${index}-recomendation-title` }>{item.strDrink}</p>
      </div>
    ));
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

export default DetalhesComidas;
