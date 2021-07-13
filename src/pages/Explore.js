import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../css/Page.css';
import '../css/Buttons.css';

class Explore extends Component {
  render() {
    return (
      <div className="page">
        <div className="perfil-container">
          <section>
            <Header title="Explorar" searchIcon />
          </section>

          <section className="buttons-explore-container">
            <Link to="/explorar/comidas">
              <button
                className="buttons-explore"
                type="button"
                data-testid="explore-food"
              >
                Explorar Comidas
              </button>
            </Link>

            <Link to="/explorar/bebidas">
              <button
                className="buttons-explore"
                type="button"
                data-testid="explore-drinks"
              >
                Explorar Bebidas
              </button>
            </Link>
          </section>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Explore;
