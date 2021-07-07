import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Explore extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Explorar" searchIcon />
        </section>

        <section>
          <button
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
          <button
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </section>
        <Footer />
      </>
    );
  }
}

export default Explore;
