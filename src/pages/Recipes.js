/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import FoodCard from '../components/FoodCard/FoodCard';
import CategoryButton from '../components/CategoryButton';
import { fetchCategories } from '../services/recipesAPI';
import './style/Recipes.css';

function Recipes({ type }) {
  const { recipes } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const categoryButtonQuantity = 5;
  const idRecipeType = type === 'comidas' ? 'idMeal' : 'idDrink';
  const mealsOrDrinks = type === 'comidas' ? 'meals' : 'drinks';
  const cardMaximun = 12;
  const lengthRecipes = recipes ? recipes.length : null;
  const alertMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const getCategories = async () => {
    const request = await fetchCategories(mealsOrDrinks);
    setCategories(request[mealsOrDrinks]);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      { lengthRecipes === null
      && global.alert(alertMsg) }
      { lengthRecipes === 1
      && <Redirect to={ `/${type}/${recipes[0][idRecipeType]}` } /> }
      <div className="buttons">
        {
          categories.length > 0
          && categories.map((category, index) => (
            index < categoryButtonQuantity
              && <CategoryButton
                key={ index }
                category={ category.strCategory }
                mealsOrDrinks={ mealsOrDrinks }
              />
          ))
        }
      </div>
      <div className="cards">
        {
          recipes
          && recipes.map((recipe, i) => (
            i < cardMaximun
             && <FoodCard key={ i } order={ i } recipes={ recipe } type={ type } />
          ))
        }
      </div>
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};
export default Recipes;
