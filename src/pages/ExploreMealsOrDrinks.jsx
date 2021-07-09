import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../components';
// import { getRandomIdMeal } from '../services';

function ExploreMealsOrDrinks({ history }) {
  const { pathname } = history.location;
  // const idMeal = async () => {
  //   const id = await getRandomIdMeal();
  //   return id;
  // };
  // console.log(idMeal());
  const renderExploreMeals = () => (
    <>
      <Link to="/explorar/comidas/ingredientes">
        <p data-testid="explore-by-ingredient">
          Por Ingredientes
        </p>
      </Link>

      <Link to="/explorar/comidas/area">
        <p data-testid="explore-by-area">
          Por Local de Origem
        </p>
      </Link>

      <Link to="/comidas/52771">
        <p data-testid="explore-surprise">
          Me Surpreenda!
        </p>
      </Link>
    </>
  );

  const renderExploreDrinks = () => (
    <>
      <Link to="/explorar/bebidas/ingredientes">
        <p data-testid="explore-by-ingredient">
          Por Ingredientes
        </p>
      </Link>

      <Link to="/bebidas/178319">
        <p data-testid="explore-surprise">
          Me Surpreenda!
        </p>
      </Link>
    </>
  );

  return (
    <section>
      <Header />
      {pathname.includes('comidas') ? renderExploreMeals() : renderExploreDrinks()}
      <Footer />
    </section>
  );
}

ExploreMealsOrDrinks.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default ExploreMealsOrDrinks;
