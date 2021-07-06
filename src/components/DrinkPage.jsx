import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';

function DrinkPage({ history }) {
  const { goSearch, setTitle, drinks } = useContext(ContextRecipes);
  const maxLength = 11;

  useEffect(() => {
    setTitle('Bebidas');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <section>
        { drinks
        // https://stackoverflow.com/questions/42374873/limit-items-in-a-map-loop/42374933
          .map(({ strDrink, strDrinkThumb }, index) => index <= maxLength && (
            <article key={ index }>
              <img src={ strDrinkThumb } alt={ strDrink } width="150" />
              <p>{ strDrink }</p>
            </article>))}
      </section>
      <Footer history={ history } />
    </div>
  );
}

DrinkPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default DrinkPage;
