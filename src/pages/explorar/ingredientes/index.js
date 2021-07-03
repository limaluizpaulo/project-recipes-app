import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

function ExplorarPorIngredientes() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const isDrinks = pathname.includes('bebidas');
  const title = isDrinks ? 'Bebidas' : 'Comidas';

  return (
    <div>
      <Header title="Explorar Ingredientes" showSearchIcon={ false } />
      <p>{ `Explorar${title}PorIngredientes` }</p>
      <Footer />
    </div>
  );
}

export default ExplorarPorIngredientes;
