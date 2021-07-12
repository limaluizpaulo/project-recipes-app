import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function Profile() {
  return (
    <div>
      <Header pageName="Perfil" />
      <Link to="/receitas-favoritas">
        <button
          type="submit"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Footer />
    </div>
  );
}
