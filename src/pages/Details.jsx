import React, { useContext, useEffect, useState } from 'react';
import { /* useLocation, */ useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
// import { copy } from 'clipboard-copy';
import { getMealById } from '../helpers/MealsAPI';
import RecipesContext from '../contexts/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Button from '../helpers/Button';
import Recommended from '../components/Recommended';

function Details() {
  const { id } = useParams();
  // const [idDetails, setIdDetails] = useState(id);
  const { /* isFetching, */ type } = useContext(RecipesContext);
  const [detailsData, setDetailsData] = useState({});

  const capitalize = (text) => text.replace(
    /(?:^|\s)\S/g, (first) => first.toUpperCase(),
  );

  const minusOne = -1;
  const singleType = capitalize(type.slice(0, minusOne));
  const thumbnail = `str${singleType}Thumb`;
  const title = `str${singleType}`;
  const category = type === 'meals' ? 'strCategory' : 'strAlcoholic';
  const instructions = 'strInstructions';
  // const { pathname } = useLocation();
  // console.log(pathname);
  useEffect(() => {
    const getData = async () => {
      const result = await getMealById(id, type);
      setDetailsData(result[0]);
    };
    getData();
  }, [type, id]);
  const thirtyTwo = 32;
  // console.log(thumbnail);
  // const videoId = type === 'meals'?(
  // videoId = detailsData.strYoutube === undefined ? null
  //   : detailsData.strYoutube.slice(thirtyTwo);
  // const video = (
  //   <section data-testid="video">
  //     <h3>Video</h3>
  //     <YouTube
  //       videoId={ videoId }
  //     />
  //   </section>)) : '';
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

  return (detailsData === undefined ? <div /> : Object.keys(detailsData).length !== 0
  && (
    <div className="transparent">
      <header>
        <img
          className="detail-thumb"
          src={ detailsData[thumbnail] }
          alt={ detailsData[title] }
          data-testid="recipe-photo"
        />
      </header>
      <main className="main">
        <h1 data-testid="recipe-title" className="detail-title">{detailsData[title]}</h1>
        <h2
          data-testid="recipe-category"
          className="detail-subtitle"
        >
          {detailsData[category]}
        </h2>
        <div className="actions">
          <button type="button">
            <img src={ shareIcon } alt="Share" data-testid="share-btn" />
          </button>
          <button type="button">
            <img src={ whiteHeartIcon } alt="Favorite" data-testid="favorite-btn" />
          </button>
        </div>
        <section className="text-content">
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
        <section className="text-content">
          <h3>Instructions</h3>
          <p data-testid="instructions">{detailsData[instructions]}</p>
        </section>
        {// https://www.npmjs.com/package/react-youtube
          video()
        }
        <Recommended />
      </main>
      <footer className="footer-details">
        <Button
          className="start-recipe"
          label="Iniciar Receita"
          testid="start-recipe-btn"
        />
      </footer>
    </div>)
  );
}

export default Details;
