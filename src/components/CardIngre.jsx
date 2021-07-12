import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { useMealsContext } from '../context/mealsContext';
import { useDrinksContext } from '../context/drinksContext';

export default function CardIngre({ data, index }) {
  const { setValueMealInputByIngre, serValueMealsInput } = useMealsContext();
  const { serValueDrinksInput, setValueDrinksInputByIngre } = useDrinksContext();
  const { strIngredient, strIngredient1 } = data;
  const { pathname } = useHistory().location;
  const checkLink = () => {
    let link = '';
    if (pathname.includes('comidas')) link = '/comidas';
    if (pathname.includes('bebidas')) link = '/bebidas';
    return link;
  };
  const checkThumb = () => {
    if (pathname.includes('comida')) {
      return (`https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`);
    }
    if (pathname.includes('bebida')) {
      return (`https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`);
    }
  };
  const handleClick = async () => {
    if (pathname.includes('/comidas')) {
      setValueMealInputByIngre(strIngredient);
    }
    if (pathname.includes('bebidas')) {
      setValueDrinksInputByIngre(strIngredient1);
    }
  };

  useEffect(() => {
    if (pathname.includes('/comidas')) {
      serValueMealsInput('');
    }
    if (pathname.includes('bebidas')) {
      serValueDrinksInput('');
    }
  }, [pathname, serValueMealsInput, serValueDrinksInput]);

  return (
    <div data-testid={ `${index}-ingredient-card` } className="recipe-card">
      <Link to={ checkLink() } onClick={ handleClick }>
        <img
          src={ checkThumb() }
          alt={ strIngredient || strIngredient1 }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{strIngredient || strIngredient1}</p>
      </Link>
    </div>
  );
}

CardIngre.propTypes = {
  data: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
