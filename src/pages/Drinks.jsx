import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import FetchContext from '../context/FetchContext';

function Drinks() {
  const { setTypeFunc, data } = useContext(FetchContext);

  Drinks.displayName = 'Bebidas';

  if (data.length === 1) {
    return <Redirect to={ `/bebidas/${data[0].idDrink}` } />;
  }

  return (
    <div>
      { setTypeFunc('Drinks') }
      <Header title={ Drinks.displayName } />
    </div>
  );
}

export default Drinks;
