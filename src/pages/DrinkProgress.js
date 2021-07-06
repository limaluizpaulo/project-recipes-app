import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { recipeById } from '../services/requests';
import { filterObj } from '../utils';

const DrinkProgress = ({ match }) => {
  const {
    params: { id },
  } = match;
  const [drink, setDrink] = useState({});
  const [selecteds, setSelects] = useState([]);

  useEffect(() => {
    recipeById(id).then(setDrink);
  }, [id, setDrink]);

  const findSelecteds = (ingredient) => selecteds.find((item) => item === ingredient);

  const handleSelect = (item) => {
    if (!findSelecteds(item)) {
      setSelects([...selecteds, item]);
    } else {
      const removeSelected = selecteds.filter((ingredient) => ingredient !== item);
      setSelects(removeSelected);
    }
  };

  const renderCheckBox = () => {
    const ingredients = filterObj(/Ingredient/, drink);
    return ingredients.map(([key, ingredient]) => (
      <label
        className={ findSelecteds(key) && 'checked' }
        checked={ findSelecteds(key) && 'checked' }
        data-testid="ingredient-step"
        htmlFor="ingredient"
        key={ `${key} - ${ingredient}` }
      >
        {ingredient}
        <input onClick={ () => handleSelect(key) } type="checkbox" id="ingredient" />
      </label>
    ));
  };

  return (
    <div>
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <ul>
        Ingredientes:
        {renderCheckBox()}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <p data-testid="0-recomendation-card">recomendation</p>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
};

DrinkProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkProgress;
