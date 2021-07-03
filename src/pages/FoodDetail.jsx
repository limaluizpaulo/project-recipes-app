import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';

import HeaderDetails from '../components/HeaderDetails';
import IngredientsDetails from '../components/IngredientsDetails';

function FoodDetails() {
  const { id } = useParams();
  const {
    foodDetails,
    setFoodDetails,
    fetchRecipesById,
    setIngredientsFood,
  } = useContext(RecipesContext);

  const [load, setLoad] = useState(true);

  const food = useCallback(async () => {
    const fetch = await fetchRecipesById(id);
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = fetch[0].strYoutube.match(regExp);
    setFoodDetails({ ...fetch[0], url: `https://www.youtube.com/embed/${match[2]}` });
    setLoad(false);
  }, [fetchRecipesById, id, setFoodDetails]);

  useEffect(() => {
    food();
  }, [food]);

  useEffect(() => {
    const SIZE = -1;
    const keysIngredients = Object.keys(foodDetails)
      .map((key) => (key.indexOf('strIngredient') > SIZE ? foodDetails[key] : ''))
      .filter((value) => value !== '' && value !== ' ' && value !== null && value);

    const quantity = Object.keys(foodDetails)
      .map((key) => (key.indexOf('strMeasure') > SIZE ? foodDetails[key] : ''))
      .filter((value) => value !== '' && value !== ' ' && value !== null && value);

    const full = quantity.map((item, index) => `${item} ${keysIngredients[index]}`);

    setIngredientsFood(full);
  }, [foodDetails, setIngredientsFood]);
  return !load ? (
    <>
      <HeaderDetails />
      <main>
        <IngredientsDetails />
        <section className="Instructions">
          <h1>Instructions</h1>
          <div>
            <p data-testid="instructions">{foodDetails.strInstructions}</p>
          </div>
        </section>
        <section>
          <h1>Video</h1>
          {' '}
          <div>
            <iframe
              title={ foodDetails.strMeal }
              src={ foodDetails.url }
              frameBorder="0"
            />

          </div>
        </section>
        {/* <Recommended /> */}
        <button type="button" data-testid="start-recipe-btn">
          <span>Iniciar Receita</span>
        </button>

      </main>
    </>
  ) : <h1>Loading</h1>;
}

export default FoodDetails;
