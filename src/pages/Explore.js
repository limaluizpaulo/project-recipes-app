import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../css/Buttons.css';
import '../css/Explore.css';

class Explore extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Explorar" searchIcon />
        </section>

        <section className="explore-buttons">
          <Link to="/explorar/comidas">
            <Button
              className="buttons"
              type="button"
              data-testid="explore-food"
            >
              Explorar Comidas
            </Button>
          </Link>

          <Link to="/explorar/bebidas">
            <Button
              className="buttons"
              type="button"
              data-testid="explore-drinks"
            >
              Explorar Bebidas
            </Button>
          </Link>
        </section>
        <Footer />
      </>
    );
  }
}

export default Explore;
