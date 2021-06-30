import React, { useEffect, useState } from 'react';
import { getMealDetails, getDrinkDetails } from '../services';

import { IndicatedRecipes, MealClip } from '../components';

function FoodDetails({ match, history }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;

  const [details, setDetails] = useState([{}]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (pathname.includes('/comida')) {
        const meal = await getMealDetails(id);
        // console.log(meal);
        setDetails(meal);
      } else {
        const drink = await getDrinkDetails(id);
        console.log(drink);
        setDetails(drink);
      }
    };
    fetchDetails();
  }, [pathname, id]);

  const { strCategory, strVideo, strAlcoholic, strMeal, strDrink } = details[0];

  return (
    <>
      <img
        data-testid="recipe-photo"
        src="https://saude.abril.com.br/wp-content/uploads/2021/03/bichos-foto-vauvau-Getty-Images.png?quality=85&strip=info&resize=680,453"
        alt="nome da comida"
      />
      <h3 data-testid="recipe-title">{strMeal || strDrink}</h3>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar receita
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar receita
      </button>
      <div>
        <h4 data-testid="recipe-category">{strCategory}</h4>
        <p data-testid="instructions">Passo a passo</p>
        <div>
          {strVideo === null
            ? <span>Não temos vídeo para essa receita</span>
            : <MealClip strVideo={ strVideo } />}
        </div>
        <IndicatedRecipes data-testid={ `${1}-recomendation-card` } />
      </div>
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </>
  );
}

export default FoodDetails;
