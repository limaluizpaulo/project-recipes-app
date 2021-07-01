import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreFoods extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Explorar Comidas" searchIcon />
        </section>
        <footer data-testid="footer">
          <Footer />
        </footer>
      </>
    );
  }
}

export default ExploreFoods;
