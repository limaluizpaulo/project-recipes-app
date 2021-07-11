import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

import Footer from '../Components/Footer';
import Teste from './Teste';

function Explore() {
  return (
    <div className="foodScreen">
      <header className="header-container">
        <div>
          <Link to="/perfil">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </Link>
        </div>
        <div>
          <h1 data-testid="page-title">Explorar</h1>
        </div>
      </header>
      <Link
        to="/explorar/comidas"
        data-testid="explore-food"
        className="btn-explore"
      >
        Explorar Comidas
      </Link>
      <Link
        to="/explorar/bebidas"
        data-testid="explore-drinks"
        className="btn-explore"
      >
        Explorar Bebidas
      </Link>
      <Teste />
      <Footer />
    </div>
  );
}

export default Explore;
