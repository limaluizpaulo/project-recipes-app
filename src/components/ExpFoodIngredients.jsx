import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import Footer from './Footer';
import Header from './Header';
import SBElements from './SBElements';

function ExpFoodIngredients({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);
  const [ingredients, setIngredients] = useState([]);

  const maxLength = 11;

  const fetchIngredients = () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setIngredients(results.meals)));
  };

  useEffect(() => {
    fetchIngredients();
    setTitle('Explorar Ingredientes');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <h1>Explorar Ingredientes</h1>
      <section>
        {ingredients && ingredients
          .map(({ strIngredient }, index) => index <= maxLength && (
            <article key={ index } data-testid={ `${index}-ingredient-card` }>
              <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
              <img width="200" src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` } alt="ingredientImg" data-testid={ `${index}-card-img` } />
            </article>))}
      </section>
      <Footer history={ history } />
    </div>
  );
}

ExpFoodIngredients.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ExpFoodIngredients;
