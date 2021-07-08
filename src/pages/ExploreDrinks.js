import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomDrink } from '../actions/index';

class ExploreDrinks extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Explorar Bebidas" searchIcon />
          <Link to="/explorar/bebidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to={ `/bebidas/${fetchRandomDrink}` }>
            <button
              type="button"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </section>
        <Footer />
      </>
    );
  }
}

export default ExploreDrinks;
