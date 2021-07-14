import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import Footer from './Footer';
import Header from './Header';
import SBElements from './SBElements';

function ExpDrinkIngredients({ history }) {
  const { goSearch, setTitle, setDrinks } = useContext(ContextRecipes);
  const [drinkIngredients, setdrinkIngredients] = useState([]);

  const maxLength = 11;

  const fetchDrnkIngredients = () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setdrinkIngredients(results.drinks)));
  };

  const fetchRecipeByIngredient = (strIngredient) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient}`;
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setDrinks(results.drinks)));
  };

  useEffect(() => {
    fetchDrnkIngredients();
    setTitle('Explorar Ingredientes');
  }, [setTitle]);

  const handleClick = (strIngredient) => {
    fetchRecipeByIngredient(strIngredient);
    history.push('/bebidas');
  };

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <h1>Explorar Ingredientes</h1>
      <section>
        {drinkIngredients && drinkIngredients
          .map(({ strIngredient1 }, index) => index <= maxLength && (
            <button type="button" onClick={ () => handleClick(strIngredient1) }>
              <article key={ index } data-testid={ `${index}-ingredient-card` }>
                <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
                <img src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` } alt="ingredientImg" data-testid={ `${index}-card-img` } />
              </article>
            </button>))}
      </section>
      <Footer history={ history } />
    </div>
  );
}

ExpDrinkIngredients.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ExpDrinkIngredients;
