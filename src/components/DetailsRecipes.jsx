import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecomendationApi from '../services/api/RecomendationApi';

const DetailsRecipes = ({ obj }) => {
  const [recomendations, setRecomendations] = useState([]);

  const { imageHeader, title, category,
    urlVideo, ingredients, instructions, type } = obj;

  useEffect(() => {
    const getApi = async () => {
      const recomend = await RecomendationApi(type);
      await setRecomendations(recomend);
    };
    getApi();
  }, []);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ imageHeader }
        alt=""
      />
      <title data-testid="recipe-title">
        {title}
      </title>
      <button
        type="button"
        data-testid="share-btn"
      // onClick={}
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      // onClick={}
      >
        Favoritar
      </button>
      <h2
        data-testid="recipe-category"
      >
        {category}
      </h2>
      <section>
        <h3>Ingredient</h3>
        <ol>
          {ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>))}
        </ol>
      </section>

      <section>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
        >
          {instructions}
        </p>
      </section>

      <section>
        { type === 'meals' && (
          <iframe
            data-testid="video"
            width="640"
            height="597"
            src={ urlVideo }
            title="Receita video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;
            gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) }
      </section>

      <section />
      <section>
        <h2>Recomendations</h2>
        {
          (type === 'meals')
            ? recomendations.map(({ idMeal, strMeal, strCategory, strSource }) => (
              <div key={ idMeal }>
                <img src={ strSource } alt="recomendation" />
                <p>{strCategory }</p>
                <h3>{strMeal}</h3>
              </div>
            ))
            : recomendations.map(({ idDrink, strDrink, strCategory, strSource }) => (
              <div key={ idDrink }>
                <img src={ strSource } alt="recomendation" />
                <p>{strCategory }</p>
                <h3>{strDrink}</h3>
              </div>
            ))
        }

      </section>
      <button
        data-testid="start-recipe-btn"
        type="button"
        // onClick={}
      >
        Iniciar Receita
      </button>
    </div>

  );
};

DetailsRecipes.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  ingredient: PropTypes.string,
  instructions: PropTypes.string,
  recomendations: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default DetailsRecipes;
