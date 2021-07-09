import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';
import FoodCategoryButtons from './FoodCategoryButtons';

function FoodPage({ history }) {
  const { goSearch, setTitle, recipes } = useContext(ContextRecipes);
  const maxLength = 11;
  // const recipesFiltered = recipes
  //   .filter((recipe) => recipe.strMeal.includes(searchInput));

  useEffect(() => {
    setTitle('Comidas');
  }, [setTitle]);
  // console.log(Object.values(recipes)[0]);

  return (
    <main>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <FoodCategoryButtons history={ history } />
      <section>
        {/* { recipes.length === 1
          && <Redirect to={ `/comidas/${recipes[0].idMeal}` } /> } */}
        {recipes && recipes
          // https://stackoverflow.com/questions/42374873/limit-items-in-a-map-loop/42374933
          .map(({ idMeal, strMeal, strMealThumb }, index) => index <= maxLength && (
            <Link to={ `/comidas/${idMeal}` }>
              <article key={ index } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  width="150"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              </article>
            </Link>))}
      </section>
      <Footer history={ history } />
    </main>
  );
}

FoodPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default FoodPage;
