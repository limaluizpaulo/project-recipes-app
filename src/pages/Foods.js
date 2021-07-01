import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Foods extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Comidas" />
        </section>
        <footer data-testid="footer">
          <Footer />
        </footer>
      </>
    );
  }
}

export default Foods;
