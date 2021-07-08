import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';
import DrinksContext from '../context/DrinksContext';

import '../styles/IngredientCard.css';

function IngredientCard({ index, ingredient }) {
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  const { filterRecipesByIngredient, setIsFiltred } = useContext(RecipesContext);

  const { filterDrinksByIngredient, setIsFiltred: setIsFiltredDrinks,
  } = useContext(DrinksContext);

  function redirectToRecipes() {
    filterRecipesByIngredient(ingredient);
    setIsFiltred(true);
    history.push('/comidas');
  }

  function redirectToDrinks() {
    filterDrinksByIngredient(ingredient);
    setIsFiltredDrinks(true);
    history.push('/bebidas');
  }

  function renderRecipes() {
    return (
      <Button
        variant
        data-testid={ `${index}-ingredient-card` }
        type="button"
        onClick={ () => redirectToRecipes() }
      >
        <Card
          style={ { background: '#dc35463d', height: '12rem', width: '12rem' } }
          border="danger"
        >
          <Card.Img
            className="card-image"
            data-testid={ `${index}-card-img` }
            variant="top"
            src={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
            alt={ ingredient }
          />
          <Card.Body className="title-container">
            <Card.Title
              className="card-title"
              data-testid={ `${index}-card-name` }
            >
              {ingredient}

            </Card.Title>
          </Card.Body>
        </Card>
      </Button>
    );
  }

  function renderDrinks() {
    return (
      <Button
        variant
        data-testid={ `${index}-ingredient-card` }
        type="button"
        onClick={ () => redirectToDrinks() }
      >
        <Card
          style={ { background: '#dc35463d', height: '12rem', width: '12rem' } }
          border="danger"
        >
          <Card.Img
            className="card-image"
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
            alt={ ingredient }
          />
          <Card.Body className="title-container">
            <Card.Title
              className="card-title"
              data-testid={ `${index}-card-name` }
            >
              {ingredient}
            </Card.Title>
          </Card.Body>
        </Card>
      </Button>
    );
  }
  return (

    <section className="ingredient">
      {
        pathname.includes('/comidas')
          ? renderRecipes()
          : renderDrinks()
      }
    </section>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
};

export default IngredientCard;
