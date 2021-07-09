import React from 'react';
import PropTypes from 'prop-types';

const ExploreSurpriseButton = ({ history }) => {
  const handleClick = () => {
    const path = history.location.pathname;
    if (path === '/explorar/comidas') {
      const fetchMealRandom = async () => {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
        const request = await fetch(endpoint);
        const { meals } = await request.json();
        const surpriseId = meals[0].idMeal;
        history.push(`/comidas/${surpriseId}`);
      };
      fetchMealRandom();
    } else {
      const fetchDrinkRandom = async () => {
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        const request = await fetch(endpoint);
        const { drinks } = await request.json();
        const surpriseId = drinks[0].idDrink;
        history.push(`/bebidas/${surpriseId}`);
      };
      fetchDrinkRandom();
    }
  };

  return (
    <button
      className="explore__button"
      data-testid="explore-surprise"
      onClick={ handleClick }
      type="button"
    >
      Me Surpreenda!
    </button>
  );
};

ExploreSurpriseButton.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default ExploreSurpriseButton;
