import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { fetchRecipeAllDrink,
  fetchRecipeAllFood,
  fetchRecipeIDFood, fetchRecipeIDrinks } from '../services/recipeAPI';

function RecipeDetail({ idRecipe, typeRecipe }) {
  const [list, setList] = useState([]);
  const [leng, setLeng] = useState([]);
  const [reco, setReco] = useState([]);

  useEffect(() => {
    const func = async (api) => {
      console.log(idRecipe);
      const fun = await api(idRecipe);
      const type = Object.keys(fun)[0];
      const lista = fun[type];
      const ingret = Object.keys(
        lista[0],
      ).filter((element) => element.includes('strIngredient'));
      setLeng(ingret);
      console.log(ingret);
      console.log(lista[0]);
      //   console.log(lista[0].strYoutube);

      setList(lista[0]);
    };

    const rec = async (api) => {
      const fun = await api();
      const type = Object.keys(fun)[0];
      const lista = fun[type];
      const NUMBER = 6;
      console.log(lista.slice(0, NUMBER));
      setReco(lista.slice(0, NUMBER));
    };
    if (typeRecipe === 'food') {
      func(fetchRecipeIDFood);
      rec(fetchRecipeAllDrink);
    } else {
      func(fetchRecipeIDrinks);
      rec(fetchRecipeAllFood);
    }
  }, [idRecipe, typeRecipe]);
  return (
    <div>

      <img
        width="140"
        alt={ typeRecipe === 'food' ? list.strMeal : list.strDrink }
        src={ typeRecipe === 'food' ? list.strMealThumb : list.strDrinkThumb }
        data-testid="recipe-photo"
      />

      <p
        data-testid="recipe-title"
      >
        { typeRecipe === 'food' ? list.strMeal : list.strDrink }

      </p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <p data-testid="recipe-category">
        { typeRecipe === 'food' ? list.strCategory : list.strAlcoholic }
      </p>
      <p className="instruction" data-testid="instructions">{list.strInstructions}</p>
      <ul>
        {leng.map((ing, index) => (
          <li
            className="instruction"
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {list[ing]}
            -
            {list[`strMeasure${index + 1}`]}
          </li>))}
      </ul>
      { typeRecipe === 'food'
      && <iframe
        data-testid="video"
        width="260"
        height="200"
        src={ list.length === 0 ? `https://www.youtube.com/embed/${list.strYoutube}` : `https://www.youtube.com/embed/${list.strYoutube.split('v=')[1]}` }
        title="YouTube video player"
        frameBorder="0"
        allow="
        accelerometer;
        autoplay;
        clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />}
      <div className="show-recipe">
        { reco.map((item, index) => (
          <button
            data-testid={ `${index}-recomendation-card` }
            type="button"
            className="papai"
            key={ index }
          >
            <img
              className="filhinho"
              src={ typeRecipe !== 'food'
                ? item.strMealThumb : item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ typeRecipe !== 'food' ? item.strMeal : item.strDrink }
              width="20%"
            />
            <p data-testid={ `${index}-card-name` }>
              { typeRecipe !== 'food' ? item.strMeal : item.strDrink }
            </p>
          </button>))}
      </div>
      <button
        className="start-recipe"
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita

      </button>

    </div>

  );
}

RecipeDetail.propTypes = {
  idRecipe: PropTypes.string,
  typeRecipe: PropTypes.string,
}.isRequired;
export default RecipeDetail;

//   <ul data-testid={ `${index}-ingredient-name-and-measure` }>{' '}</ul>
//   <p data-testid="instructions">{' '}</p>
//   <video type="video" data-testid="video"><source src="" /></video>
//   <button type="button" data-testid={ `${index}-recomendation-card` }>{' '}</button>
//   <button type="button" data-testid="start-recipe-btn">{' '}</button>
