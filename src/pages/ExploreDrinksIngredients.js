import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreDrinksIngredients extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Explorar Ingredientes" searchIcon />
        </section>
        <footer data-testid="footer">
          <Footer />
        </footer>
      </>
    );
  }
}

export default ExploreDrinksIngredients;
