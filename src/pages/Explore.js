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
        <Footer />
      </>
    );
  }
}

export default Explore;
