import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import List from '../components/List';
import RecomendationsDrink from '../components/RecomendationsDrink';
import { requestByDetailsMeal } from '../services/api';
import Icons from '../components/Icons';
import '../styles/DrinkAndFoodDetails(page).css';

function FoodDetails() {
  const params = useParams();
  const [item, setItem] = useState([]);
  const [first, setFirst] = useState(false);
  const [progress, setProgress] = useState('Iniciar Receita');

  useEffect(() => {
    const request = async () => {
      const result = await requestByDetailsMeal(params.id);
      setItem(result.meals);
    };
    request();
  }, [params.id]);

  function progressFunction() {
    const { idMeal } = item[0];
    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let flag = 0;
    Object
      .keys(meals).forEach((id) => { if (id === idMeal) flag += 1; });
    if (flag !== 0) setProgress('Continuar Receita');
    setFirst(true);
  }

  function start() {
    const { idMeal } = item[0];
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    inProgress.meals[`${idMeal}`] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    setProgress('Continuar Receita');
  }

  if (!first && item[0] !== undefined) {
    progressFunction();
  }

  return (
    item && (
      item.map((
        { idMeal, strMeal, strInstructions, strYoutube,
          strMealThumb, strCategory, strSource, ...rest },
        index,
      ) => {
        const array = rest;
        return (
          <div className="food-details-main-div" key={ index }>
            <div className="details-align">
              <div>
                <img
                  src={ strMealThumb }
                  className="details-img"
                  alt={ strMeal }
                  data-testid="recipe-photo"
                />
                <section className="detailsTitle-container">
                  <h1
                    className="details-title"
                    data-testid="recipe-title"
                  >
                    { strMeal }
                  </h1>
                  <Icons code={ item[0] } />
                </section>
              </div>
              <Badge
                variant="info"
                data-testid="recipe-category"
              >
                { strCategory }
              </Badge>
              <List array={ array } />
              <h2 className="section-title">Instructions</h2>
              <p
                className="details-instructions"
                data-testid="instructions"
              >
                { strInstructions }
              </p>
              <h2 className="section-title">Video</h2>
              <iframe
                className="details-video"
                data-testid="video"
                src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
                frameBorder="0"
                allowFullScreen
                title="Embedded youtube"
              />
              <h2 className="section-title">Recomendations</h2>
            </div>
            <RecomendationsDrink />
            <Link to={ `/comidas/${idMeal}/in-progress` }>
              <button
                type="button"
                className="details-startRecipeBtn"
                data-testid="start-recipe-btn"
                onClick={ start }
              >
                {progress}
              </button>
            </Link>
          </div>
        );
      }))
  );
}

export default FoodDetails;
