import React, { useContext } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import RecipeContext from '../context';
import createListIngredients from '../helpers/ingredientsList';

function IngredientsList() {
  const { recipes } = useContext(RecipeContext);
  return (
    <ListGroup>
      { createListIngredients(recipes).map((ingredient, index) => (
        <ListGroupItem
          key={ ingredient }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default IngredientsList;
