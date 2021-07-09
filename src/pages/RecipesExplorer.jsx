import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class RecipesExplorer extends Component {
  render() {
    return (
      <div>
        <Header
          header="Explorar Comidas"
          explorer={ false }
        />
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>

        <Link to={ `/comidas/${id}` }>
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

export default RecipesExplorer;
