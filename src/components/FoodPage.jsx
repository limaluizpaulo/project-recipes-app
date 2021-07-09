import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';
import '../App.css';

function FoodPage({ history }) {
  const { goSearch, setTitle, recipes } = useContext(ContextRecipes);
  const maxLength = 11;
  // const recipesFiltered = recipes
  //   .filter((recipe) => recipe.strMeal.includes(searchInput));

  useEffect(() => {
    setTitle('Comidas');
  }, [setTitle]);
  console.log(Object.values(recipes)[0]);

  return (
    <main className="main-container">
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <section className="render-cards">
        { recipes.length === 1 && <Redirect to={ `/comidas/${recipes[0].idMeal}` } /> }
        {recipes && recipes
          // https://stackoverflow.com/questions/42374873/limit-items-in-a-map-loop/42374933
          .map(({ strMeal, strMealThumb }, index) => index <= maxLength && (
            <article
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className="recipe-card"
            >
              <img
                src={ strMealThumb }
                alt={ strMeal }
                width="150"
                data-testid={ `${index}-card-img` }
              />
              {/* <button type="submit"> */}
              <span role="button" data-testid={ `${index}-card-name` }>{ strMeal }</span>
              {/* </button> */}
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
