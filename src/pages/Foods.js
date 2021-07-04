import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { GlobalContext } from '../context/Provider';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import RecipeCard from '../components/RecipeCard';

const Foods = () => {
  const {
    meals: defaultMeals,
    recipes: { meals = [] },
  } = useContext(GlobalContext);

  const renderCard = () => {
    const magic = 12;
    if (meals && defaultMeals) {
      const recipes = meals.length ? meals : defaultMeals;
      const newRecipes = recipes.filter((_, idx) => idx < magic);
      return <RecipeCard recipes={ newRecipes } />;
    }
    return [];
  };

  return (
    <div>
      <Header title="Comidas" search food />
      <Categories food />
      <div className="grade">{renderCard()}</div>
      <Footer />
    </div>
  );
};

export default Foods;
