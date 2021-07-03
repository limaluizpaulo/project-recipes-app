import React from 'react';
import { Link } from 'react-router-dom';

const Drink = () => (
  <div>
    {/* <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } /> */}
    {/* <h1 data-testid="recipe-title">{ strDrink }</h1> */}
    {/* <button data-testid="share-btn" type="button">Compartilhar</button> */}
    {/* <button data-testid="favorite-btn" type="button">Favorito</button> */}
    {/* <h2 data-testid="recipe-category">{ strCategory }</h2> */}
    {/* .map((_, index) => (
      <p data-testid="${index}-ingredient-name-and-measure">{ `strIngredient${index}` }</p>
    )); */}
    {/* <p data-testid="instructions">{ strInstructions }</p> */}
    {/* <source data-testid="video" src="movie.mp4" type="video/mp4" /> */}
    {/* O card de receitas recomendadas data-testid="${index}-recomendation-card" */}
    {/* <button type="button" data-testid="start-recipe-btn">Play</button> */}
    <br />
    <br />
    <Link to="/bebidas/">
      <button type="button">Voltar</button>
    </Link>
  </div>
);

export default Drink;
