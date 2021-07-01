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
        <Footer />
      </>
    );
  }
}

export default ExploreDrinks;
