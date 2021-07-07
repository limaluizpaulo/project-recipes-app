import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  Perfil.displayName = 'Perfil';
  return (

    <div>
      <Header title={ Perfil.displayName } />
      <Link to="/receitas-favoritas" className="btn">receitas favoritas</Link>
      <Footer />
    </div>
  );
}

// <Link to="/receitas-favoritas" className="btn">receitas favoritas</Link>
// <Redirect to="/receitas-feitas" />
// <Redirect to="/receitas-favoritas" />

export default Perfil;
