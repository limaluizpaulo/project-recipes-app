import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipesDetails.css';

const DetailsRecipes = ({ newObj }) => {
  const { urlVideo, type, recomendations } = newObj;
  console.log(urlVideo);

  const SEIS = 6;
  return (
    <div>
      <section>
        { type === 'meals' && (
          <iframe
            data-testid="video"
            width="425"
            height="240"
            src={ urlVideo.replace('watch', 'embed') }
            title="YouTube video player"
          />
        ) }
      </section>

      <section />
      <section>
        <h2>Recomendations</h2>
        {
          (type === 'meals')
            ? recomendations.map(({ idDrink,
              strDrink,
              strAlcoholic,
              strDrinkThumb }, index) => {
              if (index < SEIS) {
                return (
                  <div key={ idDrink } data-testid={ `${index}-recomendation-card` }>
                    <img src={ strDrinkThumb } alt="recomendation" />
                    <p>{strAlcoholic }</p>
                    <h3>{strDrink}</h3>
                  </div>
                );
              }
              return null;
            })
            : recomendations.map(({ idMeal,
              strMeal,
              strCategory,
              strMealThumb }, index) => {
              if (index < SEIS) {
                return (
                  <div key={ idMeal } data-testid={ `${index}-recomendation-card` }>
                    <img src={ strMealThumb } alt="recomendation" />
                    <p>{strCategory }</p>
                    <h3>{strMeal}</h3>
                  </div>
                );
              }
              return null;
            })
        }

      </section>
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="button-start"
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
