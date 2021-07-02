import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { GlobalContext } from '../context/Provider';
import Footer from '../components/Footer';

const Foods = () => {
  const {
    recipes: { meals = [] },
  } = useContext(GlobalContext);
  const [defaultMeals, setDefaultMeals] = useState([]);

  useEffect(() => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(URL)
      .then((res) => res.json())
      .then(({ meals: data }) => setDefaultMeals(data));
  }, []);

  const renderCard = () => {
    const magic = 12;
    if (meals && defaultMeals) {
      const recipes = meals.length ? meals : defaultMeals;
      const newRecipes = recipes.filter((_, idx) => idx < magic);
      return newRecipes.map(({ strMealThumb, strMeal }, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt={ strMeal } />
          <p data-testid={ `${index}-card-name` }>{strMeal}</p>
        </div>
      ));
    }
    return [];
  };

  return (
    <div>
      <Header title="Comidas" search food />
      {renderCard().length && renderCard()}
      <Footer />
    </div>
  );
};

export default Foods;
