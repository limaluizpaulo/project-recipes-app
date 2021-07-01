import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DrinksContext from '../../context/drinks.context';
import { fetchDetails, fetchByName } from '../../services';
import DrinksCarousel from '../../components/DrinksCarousel';
import whiteFavIcon from '../../images/whiteHeartIcon.svg';

function DetalhesComida() {
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [youtubeId, setYoutubeId] = useState('');
  const { id } = useParams();
  const { setDrinks } = useContext(DrinksContext);

  async function getDetails() {
    const result = await fetchDetails('meals', id);

    const array = Object.entries(result)
      .filter((item) => item[0].includes('Ingredient') && item[1])
      .map((item) => item[1]);
    setIngredients(array);

    const array2 = Object.entries(result)
      .filter((item) => item[0].includes('Measure') && item[1])
      .map((item) => item[1]);
    setMeasures(array2);
    setDetails(result);

    setYoutubeId(result.strYoutube.split('=')[1]);
  }

  async function getDrinks() {
    const result = await fetchByName('drinks');
    setDrinks(result);
  }

  useEffect(() => {
    getDetails();
    getDrinks();
  }, []);

  return (
    <main>
      <div>
        <img
          className="details-image"
          src={ details.strMealThumb }
          alt={ details.strMeals }
          data-testid="recipe-photo"
        />
        <button type="button">
          compartilhar
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteFavIcon } alt="Favoritar" />
        </button>
        <p data-testid="recipe-title">{ details.strMeal }</p>
        <p data-testid="recipe-category">{ details.strCategory }</p>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              { ingredient }
              {' '}
              -
              { measures[index] }
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{ details.strInstructions }</p>
        <iframe
          className="youtube-video"
          src={ `https://www.youtube.com/embed/${youtubeId}` }
          title="Video da receita"
          data-testid="video"
        />
      </div>
      <DrinksCarousel />
      <div>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
    </main>
  );
}

export default DetalhesComida;
