import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import SBElements from './SBElements';
import Footer from './Footer';
import ContextRecipes from '../context/contextRecipes';

function ExploreDrinks({ history }) {
  const { goSearch, setTitle, randomDrink, setRandomDrink } = useContext(ContextRecipes);

  const fetchRandomDrink = () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    fetch(endpoint)
      .then((response) => response.json())
      .then((results) => console.log(results)
      || setRandomDrink(results.drinks) || results.drinks[0].idDrink)
      // .then((idMeal) => history.push(`/explorar/comidas/${idMeal}`))
      .catch((error) => console.log('Deu ruim no fetch das bebidas', error));
  };

  const handleClick = () => {
    fetchRandomDrink();
  };

  useEffect(() => {
    setTitle('Explorar Bebidas');
  }, [setTitle]);

  useEffect(() => {
    if (randomDrink[0]) {
      const { idDrink } = randomDrink[0];
      history.push(`/bebidas/${idDrink}`);
    }
  }, [randomDrink]);

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <h1>Explorar Bebidas</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </button>
      <Footer history={ history } />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ExploreDrinks;
