import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';
import copy from 'clipboard-copy';
import { getMealById } from '../helpers/MealsAPI';
import RecipesContext from '../contexts/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Button from '../helpers/Button';
import Recommended from '../components/Recommended';
import { getItem, setItem } from '../helpers/HelperFunctions';

function Details() {
  const { id } = useParams();
  const history = useHistory();
  // const [idDetails, setIdDetails] = useState(id);
  const { /* isFetching, */ type } = useContext(RecipesContext);
  const [detailsData, setDetailsData] = useState({});
  const [shareCopy, setShareCopy] = useState(false);

  const capitalize = (text) => text.replace(
    /(?:^|\s)\S/g, (first) => first.toUpperCase(),
  );

  const minusOne = -1;
  const singleType = capitalize(type.slice(0, minusOne));
  const thumbnail = `str${singleType}Thumb`;
  const title = `str${singleType}`;
  const category = type === 'meals' ? 'strCategory' : 'strAlcoholic';
  const instructions = 'strInstructions';
  const { pathname } = useLocation();
  // console.log(pathname);
  useEffect(() => {
    const getData = async () => {
      const result = await getMealById(id, type);
      setDetailsData(result[0]);
    };
    getData();
  }, [type, id]);
  const thirtyTwo = 32;

  const typeKey = type === 'drinks' ? 'cocktails' : 'meals';
  const redirectInProgress = () => {
    const item = getItem('inProgressRecipes');
    setItem('inProgressRecipes', {
      ...item,
      [typeKey]: {
        ...item[typeKey],
        [id]: [],
      },
    });
    // const progressInfo = JSON.stringify({ [typeKey]: { [id]: [] } });
    history.push(`${pathname}/in-progress`);
  };

  const recipeProgress = () => {
    const item = getItem('inProgressRecipes');
    return (item[typeKey][id.toString()]) ? 'Continuar Receitas' : 'Iniciar Receita';
  };
  const video = () => {
    if (type === 'drinks') {
      return null;
    }
    const videoId = detailsData.strYoutube === undefined ? ''
      : detailsData.strYoutube.slice(thirtyTwo);
    return (
      <section data-testid="video">
        <h3>Video</h3>
        <YouTube
          videoId={ videoId }
        />
      </section>);
  };

  const ingredientsAndMeasures = (ingredient, measure) => (measure !== null
    ? `${ingredient} - ${measure}` : ingredient);
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

  /*
    Material consultado sobre dataset
    https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Howto/Use_data_attributes#acesso_no_javascript
    { target: { dataset: { testid } } }
    */
  /*
    Material consultado sobre URL absoluta da página
    https://surajsharma.net/blog/current-url-in-react
  */
  const handleClickShare = async () => {
    const url = window.location.href;

    await copy(url);
    setShareCopy(true);

    const FIVE_SECONDS = 5000;
    setTimeout(() => {
      setShareCopy(false);
    }, FIVE_SECONDS);
  };

  return (detailsData === undefined ? <div /> : Object.keys(detailsData).length !== 0
  && (
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
        <button type="button" onClick={ handleClickShare }>
          <img src={ shareIcon } alt="Share" data-testid="share-btn" />
        </button>
        {shareCopy && (<p>Link copiado!</p>) }
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
                    { ingredientsAndMeasures(detailsData[ingredient],
                      detailsData[`strMeasure${index + 1}`]) }
                  </li>),
              )
            }
          </ul>
        </section>
        <section>
          <h3>Instructions</h3>
          <p data-testid="instructions">{detailsData[instructions]}</p>
        </section>
        {// https://www.npmjs.com/package/react-youtube
          video()
        }
        <Recommended />
      </main>
      <footer>
        <Button
          func={ () => redirectInProgress() }
          className="start-recipe"
          label={ recipeProgress() }
          testid="start-recipe-btn"
        />
      </footer>
    </>)
  );
}

export default Details;
