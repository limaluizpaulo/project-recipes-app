import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';
import DrinksContext from '../context/DrinksContext';

function CategoryCard(props) {
  const { setRecipeCategory } = useContext(RecipesContext);
  const { setDrinkCategory } = useContext(DrinksContext);
  const { food, name } = props;

  return (
    <section>
      <Button
        data-testid={ `${name}-category-filter` }
        onClick={
          food
            ? (ev) => { setRecipeCategory(ev.target.innerText); }
            : (ev) => { setDrinkCategory(ev.target.innerText); }
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
