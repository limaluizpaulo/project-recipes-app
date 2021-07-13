import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../components';
import './css/explore.css';

function Explore() {
  return (
    <section>
      <Header />
      <main id="exploreContainer">
        <section id="exploreMeals">
          <Link to="/explorar/comidas">
            <p data-testid="explore-food">Explorar Comidas</p>
          </Link>
          <div />
        </section>
        <section id="exploreDrinks">
          <Link to="/explorar/bebidas">
            <p data-testid="explore-drinks">Explorar Bebidas</p>
          </Link>
          <div />
        </section>
      </main>
      <Footer />
    </section>
  );
}

export default Explore;
