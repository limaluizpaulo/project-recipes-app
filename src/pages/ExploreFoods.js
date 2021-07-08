import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreFoods extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Explorar Comidas" searchIcon />
          <Link to="/explorar/comidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origen
            </button>
          </Link>
          <Link to="/comidas/53000">
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

export default ExploreFoods;
