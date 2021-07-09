import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  const [redirect, setRedirect] = useState();
  const exploreBtn = (food) => (
    <button
      type="button"
      data-testid={ food ? 'explore-food' : 'explore-drinks' }
      onClick={ () => setRedirect(food ? '/explorar/comidas' : '/explorar/bebidas') }
    >
      {food ? 'Explorar Comidas' : 'Explorar Bebidas'}
    </button>
  );

  return redirect ? <Redirect to={ redirect } /> : (
    <>
      <div>Tela de explorar</div>
      <Header title="Explorar" />
      {exploreBtn('food')}
      {exploreBtn()}
      <Footer />
    </>
  );
}
