import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';
import DrinksContext from '../context/DrinksContext';

function CategoryCard(props) {
  const { recipeCategory, setRecipeCategory } = useContext(RecipesContext);
  const { drinkCategory, setDrinkCategory } = useContext(DrinksContext);
  const { food, name } = props;

  function toogleRecipeCategory(ev) {
    if (recipeCategory === ev.target.innerText) {
      setRecipeCategory('All');
    } else { setRecipeCategory(ev.target.innerText); }
  }

  function toogleDrinkCategory(ev) {
    if (drinkCategory === ev.target.innerText) {
      setDrinkCategory('All');
    } else { setDrinkCategory(ev.target.innerText); }
  }

  return (
    <section>
      <Button
        data-testid={ `${name}-category-filter` }
        onClick={
          food
            ? toogleRecipeCategory
            : toogleDrinkCategory
        }
      >
        {name}

      </Button>
    </section>
  );
}

CategoryCard.propTypes = {
  food: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default CategoryCard;
