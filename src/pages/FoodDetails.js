import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import List from '../components/List';
import RecomendationsDrink from '../components/RecomendationsDrink';
import { requestByDetailsMeal } from '../services/api';
import Icons from '../components/Icons';
import '../styles/global.css';

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
    console.log(flag);
    if (flag !== 0) setProgress('Continuar Receita');
    setFirst(true);
  }

  function start() {
    const { idMeal } = item[0];
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    inProgress.meals[`${idMeal}`] = [];
    console.log(inProgress);
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
          <div key={ index }>
            <img
              src={ strMealThumb }
              className="detailImg"
              alt={ strMeal }
              data-testid="recipe-photo"
            />
            <div className="alignDetailsItens">
              <section className="detailsTitle-container">
                <div>
                  <h1 data-testid="recipe-title">{ strMeal }</h1>
                  <span data-testid="recipe-category">{ strCategory }</span>
                </div>
                <Icons code={ item[0] } />
              </section>
              <List array={ array } />
              <h2>Instructions</h2>
              <p
                className="instructions"
                data-testid="instructions"
              >
                { strInstructions }
              </p>
              <h2>Video</h2>
              <iframe
                className="detailVideo"
                data-testid="video"
                width="420"
                height="315"
                src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
                frameBorder="0"
                allowFullScreen
                title="Embedded youtube"
              />
              <h2>Recomendations</h2>
            </div>
            <RecomendationsDrink />
            <div className="recipeBtn">
              <Link to={ `/comidas/${idMeal}/in-progress` }>
                <button
                  type="button"
                  className="startRecipeBtn"
                  data-testid="start-recipe-btn"
                  onClick={ start }
                >
                  {progress}
                </button>
              </Link>
            </div>
          </div>
        );
      }))
  );
}

export default FoodDetails;
