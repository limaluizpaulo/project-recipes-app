import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Drinks extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Bebidas" />
        </section>
        <footer data-testid="footer">
          <Footer />
        </footer>
      </>
    );
  }
}

export default Drinks;
