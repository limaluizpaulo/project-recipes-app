import React from 'react';
import Header from '../components/Header';
import MealsContext from '../contexts/MealsContext';

function Perfil() {
  return (
    <Header title="Perfil" context={ MealsContext } />
  );
}

export default Perfil;
