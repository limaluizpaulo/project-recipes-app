import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../components';
import './css/mealsExplore.css';

function ExploreMealsOrDrinks({ history }) {
  const { pathname } = history.location;
  const renderExploreMeals = () => (
    <main id="renderMeals">
      <article>
        <div id="ingredient" />
        <div id="origin" />
        <div id="surprise" />
      </article>
      <div id="redirects">
        <section>
          <Link to="/explorar/comidas/ingredientes">
            <p data-testid="explore-by-ingredient">
              Por Ingredientes
            </p>
          </Link>
        </section>

        <section>
          <Link to="/explorar/comidas/area">
            <p data-testid="explore-by-area">
              Por Local de Origem
            </p>
          </Link>
        </section>

        <section>
          <Link to="/comidas/52771">
            <p data-testid="explore-surprise">
              Me Surpreenda!
            </p>
          </Link>
        </section>
      </div>
    </main>
  );

  const renderExploreDrinks = () => (
    <main id="renderDrinks">
      <article>
        <div id="ingredient" />
        <div id="surprise" />
      </article>
      <div id="redirects">
        <section>
          <Link to="/explorar/bebidas/ingredientes">
            <p data-testid="explore-by-ingredient">
              Por Ingredientes
            </p>
          </Link>
        </section>

        <section>
          <Link to="/bebidas/178319">
            <p data-testid="explore-surprise">
              Me Surpreenda!
            </p>
          </Link>
        </section>
      </div>
    </main>
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
