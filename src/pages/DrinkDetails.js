import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import List from '../components/List';
import RecomendationsMeal from '../components/RecomendationsMeal';
import { requestByDetailsDrink } from '../services/api';
import Icons from '../components/Icons';
import '../styles/global.css';

function DrinkDetails() {
  const { id } = useParams();
  const [drink, setDrink] = useState([]);
  const [first, setFirst] = useState(false);
  const [progress, setProgress] = useState('Iniciar Receita');

  useEffect(() => {
    const request = async () => {
      const result = await requestByDetailsDrink(id);
      setDrink(result.drinks);
    };
    request();
  }, [id]);

  function progressFunction() {
    console.log(drink);
    const { idDrink } = drink[0];
    const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let flag = 0;
    Object
      .keys(cocktails).forEach((id2) => { if (id2 === idDrink) flag += 1; });
    if (flag !== 0) setProgress('Continuar Receita');
    setFirst(true);
  }

  function start() {
    const { idDrink } = drink[0];
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    inProgress.cocktails[`${idDrink}`] = [];
    console.log(inProgress);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    setProgress('Continuar Receita');
  }

  if (!first && drink[0] !== undefined) {
    progressFunction();
  }

  return (
    drink && (
      drink.map((
        { idDrink, strDrink, strInstructions,
          strDrinkThumb, strAlcoholic, strSource, ...rest },
        index,
      ) => {
        const drinks = rest;
        return (
          <div key={ index }>
            <img
              src={ strDrinkThumb }
              className="detailImg"
              alt={ strDrink }
              data-testid="recipe-photo"
            />
            <div className="alignDetailsItens">
              <section className="detailsTitle-container">
                <div>
                  <h1 data-testid="recipe-title">{ strDrink }</h1>
                  <span data-testid="recipe-category">{strAlcoholic}</span>
                </div>
                <Icons code={ drink[0] } />
              </section>
              <List drinks={ drinks } />
              <h2>Instructions</h2>
              <p
                className="instructions"
                data-testid="instructions"
              >
                { strInstructions }
              </p>
              <h2>Recomendations</h2>
            </div>
            <RecomendationsMeal />
            <div className="recipeBtn">
              <Link to={ `/bebidas/${idDrink}/in-progress` }>
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

export default DrinkDetails;
