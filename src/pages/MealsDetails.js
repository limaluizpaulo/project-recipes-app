import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchRecipesById } from '../services/recipesAPI';

import RecipesContext from '../context/RecipesContext';

function MealsDetails({ match: { params: { id } } }) {
  const { mealsOrDrinks } = useContext(RecipesContext);
  const [meal, setMeal] = useState({});

  const getMeal = async () => {
    const { meals: [gotMeal] } = await fetchRecipesById(mealsOrDrinks, id);
    setMeal(gotMeal);
  };

  useEffect(() => {
    getMeal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header>
        <img src="#" alt="test" />
        <div>
          <h1>Title</h1>
          <div>
            <button type="button">share</button>
            <button type="button">fav</button>
          </div>
          <h3>Category</h3>
        </div>
      </header>
      <main>
        <p>a</p>
      </main>
    </>
  );
}

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealsDetails;
