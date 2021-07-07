import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/Provider';

const IngredientsCard = ({ ingredients }) => {
  const { setSearchOp } = useContext(GlobalContext);
  console.log(ingredients);
  return ingredients.map((ing, index) => {
    const { strIngredient, strIngredient1 } = ing;
    const db = strIngredient ? 'themealdb' : 'thecocktaildb';
    const ingredientName = strIngredient || strIngredient1;
    const thumb = `https://www.${db}.com/images/ingredients/${ingredientName}-Small.png`;
    return (
      <button
        type="button"
        key={ `${index} - ${ingredientName}` }
        className="cards"
        data-testid={ `${index}-ingredient-card` }
        onClick={ () => setSearchOp({
          option: 'ingredient',
          inputSearch: ingredientName,
          food: strIngredient,
        }) }
      >
        <Link to={ strIngredient ? '/comidas' : '/bebidas' }>
          <img data-testid={ `${index}-card-img` } src={ thumb } alt={ ingredientName } />
          <div className="container">
            <p data-testid={ `${index}-card-name` }>{ingredientName}</p>
          </div>
        </Link>
      </button>
    );
  });
};

IngredientsCard.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientsCard;
