import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealById } from '../helpers/MealsAPI';
import RecipesContext from '../contexts/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Button from '../helpers/Button';
import Recommended from '../components/Recommended';

function Details() {
  const { id } = useParams();
  const { isFetching, type } = useContext(RecipesContext);
  const [detailsData, setDetailsData] = useState({});

  const capitalize = (text) => text.replace(
    /(?:^|\s)\S/g, (first) => first.toUpperCase(),
  );

  const minusOne = -1;
  const singleType = capitalize(type.slice(0, minusOne));
  const thumbnail = `str${singleType}Thumb`;
  const title = `str${singleType}`;
  const category = 'strCategory';
  const instructions = 'strInstructions';

  useEffect(() => {
    const getData = async () => {
      const result = await getMealById(id, type);
      setDetailsData(result[0]);
    };
    getData();
  }, []);

  // if (type === 'meals') {
  //   title = 'Comidas';
  //   strTitle = 'strMeal';
  //   thumbnail = 'strMealThumb';
  //   typeId = 'idMeal';
  // } else {
  //   title = 'Bebidas';
  //   strTitle = 'strDrink';
  //   thumbnail = 'strDrinkThumb';
  //   typeId = 'idDrink';
  // }

  return (
    <>
      <header>
        <img
          width="300"
          src={ detailsData[thumbnail] }
          alt={ detailsData[title] }
          data-testid="recipe-photo"
        />
      </header>
      <main>
        <h1 data-testid="recipe-title">{detailsData[title]}</h1>
        <h2 data-testid="recipe-category">{detailsData[category]}</h2>
        <button type="button">
          <img src={ shareIcon } alt="Share" data-testid="share-btn" />
        </button>

        <button type="button">
          <img src={ whiteHeartIcon } alt="Favorite" data-testid="favorite-btn" />
        </button>
        <section>
          <h3>Ingredients</h3>
          <ul>
            {/* data-testid="${index}-ingredient-name-and-measure" */

              Object.keys(detailsData).filter(
                (key) => (key.includes('strIngredient') && detailsData[key]),
              ).map(
                (ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {detailsData[ingredient]}
                  </li>),
              )
            }
          </ul>
        </section>
        <section>
          <h3>Instructions</h3>
          <p data-testid="instructions">{detailsData[instructions]}</p>
        </section>
        <section>
          <h3>Video</h3>
          {// https://www.npmjs.com/package/react-youtube

          }
        </section>
        <Recommended />
      </main>
      <footer>
        <Button
          label="Iniciar Receita"
          testid="start-recipe-btn"
        />
      </footer>
    </>
  );
}

export default Details;
