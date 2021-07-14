import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import '../styles/RecipesDetails.css';

const DetailsRecipes = ({ newObj }) => {
  const { isDone, inProgress, addInProgress } = useContext(UserContext);
  const history = useHistory();

  const {
    id,
    urlVideo,
    type,
    recomendations,
    url,
  } = newObj;

  const SEIS = 6;

  return (
    <div>

      <section>
        { type === 'comida' && (
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
        <div className="recommendation-list">

          {
            (type === 'comida')
              ? recomendations.map(({ idDrink,
                strDrink,
                strAlcoholic,
                strDrinkThumb }, index) => {
                if (index < SEIS) {
                  return (
                    <div
                      key={ idDrink }
                      data-testid={ `${index}-recomendation-card` }
                      className="recommendation-card"
                    >
                      <img src={ strDrinkThumb } alt="recomendation" />
                      <p>{strAlcoholic }</p>
                      <h3 data-testid={ `${index}-recomendation-title` }>{strDrink}</h3>
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
                    <div
                      key={ idMeal }
                      data-testid={ `${index}-recomendation-card` }
                      className="recommendation-card"
                    >
                      <img src={ strMealThumb } alt="recomendation" />
                      <p>{strCategory }</p>
                      <h3 data-testid={ `${index}-recomendation-title` }>{strMeal}</h3>
                    </div>
                  );
                }
                return null;
              })
          }

        </div>
      </section>
      <button
        data-testid="start-recipe-btn"
        type="button"
        className={ `button-start
        ${(isDone(id)) && 'hidden-button'}` }
        onClick={ () => {
          history.push({ pathname: `${url}/in-progress`,
            state: { newObj } });
          addInProgress(type, id);
        } }
      >
        {(inProgress(id, type))
          ? 'Continuar Receita'
          : 'Iniciar Receita'}
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
