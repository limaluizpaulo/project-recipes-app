import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreDrinks extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Explorar Bebidas" searchIcon />
        </section>
        <footer data-testid="footer">
          <Footer />
        </footer>
      </>
    );
  }
}

export default ExploreDrinks;
