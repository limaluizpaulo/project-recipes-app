import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';

function FoodPage({ history }) {
  console.log(history);
  const { goSearch, setTitle, recipes } = useContext(ContextRecipes);
  const maxLength = 11;

  useEffect(() => {
    setTitle('Comidas');
  }, [setTitle]);

  return (
    <main>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <section>
        { recipes
        // https://stackoverflow.com/questions/42374873/limit-items-in-a-map-loop/42374933
          .map(({ strMeal, strMealThumb }, index) => index <= maxLength && (
            <article key={ index }>
              <img src={ strMealThumb } alt={ strMeal } width="150" />
              <p>{ strMeal }</p>
            </article>))}
      </section>
      <Footer history={ history } />
    </main>
  );
}

FoodPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default FoodPage;
