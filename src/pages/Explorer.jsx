import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import '../Style/Explorer.css';

class Explorer extends Component {
  render() {
    return (
      <div>
        <Header header="Explorar" explorer={ false } />
        {/* referencias usadas no codigo abaixo https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button */}
        <div className="page-explorer">
          <Link to="/explorar/comidas">
            <button
              type="button"
              data-testid="explore-food"
            >
              Explorar Comidas
            </button>
          </Link>

          <Link to="explorar/bebidas">
            <button
              type="button"
              data-testid="explore-drinks"
            >
              Explorar Bebidas
            </button>
          </Link>
        </div>
        <DownMenu />
      </div>
    );
  }
}

export default Explorer;
