import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class DrinksExplorer extends Component {
  render() {
    return (
      <div>
        <Header header="Explorar Bebidas" explorer={ false } />
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <Link to="/comidas/123456">
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
        <DownMenu />
      </div>
    );
  }
}

export default DrinksExplorer;
