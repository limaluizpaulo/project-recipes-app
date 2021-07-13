import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';
import Footer from './Footer';

function ExploreFoods({ history }) {
  const { goSearch, setTitle, randomFood, setRandomFood } = useContext(ContextRecipes);

  const fetchRandomFood = () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
    fetch(endpoint)
      .then((response) => response.json())
      .then((results) => console.log(results)
      || setRandomFood(results.meals) || results.meals[0].idMeal)
      // .then((idMeal) => history.push(`/explorar/comidas/${idMeal}`))
      .catch((error) => console.log('Deu ruim no fetch das comidas', error));
  };

  const handleClick = () => {
    fetchRandomFood();
  };

  useEffect(() => {
    setTitle('Explorar Comidas');
  }, [setTitle]);

  useEffect(() => {
    if (randomFood[0]) {
      const { idMeal } = randomFood[0];
      history.push(`/comidas/${idMeal}`);
    }
  }, [history, randomFood]);

  return (
    <div>
      <Header history={ history } />
      { goSearch && <SBElements history={ history } /> }
      <h1>Explorar Comidas</h1>
      <Link to="/explorar/comidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
      {/* <Link to={ `/explorar/comidas/${randomFood[]}` }> */}
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </button>
      {/* </Link> */}
      <Footer history={ history } />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ExploreFoods;
