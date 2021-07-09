import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';
import DrinkCategoryButtons from './DrinkCategoryButtons';

function DrinkPage({ history }) {
  const { goSearch, setTitle, drinks } = useContext(ContextRecipes);
  const maxLength = 11;
  // const drinksFiltered = drinks
  //   .filter((recipe) => recipe.strDrink.includes(searchInput));

  useEffect(() => {
    setTitle('Bebidas');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <DrinkCategoryButtons history={ history } />
      <section>
        {/* { drinks.length === 1
          ? history.push(`/bebidas/${drinks[0].idDrink}`) : null } */}
        { drinks && drinks
        // https://stackoverflow.com/questions/42374873/limit-items-in-a-map-loop/42374933
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => index <= maxLength && (
            <Link to={ `/bebidas/${idDrink}` }>
              <article key={ index } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  width="150"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
              </article>
            </Link>))}
      </section>
      <Footer history={ history } />
    </div>
  );
}

DrinkPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default DrinkPage;
