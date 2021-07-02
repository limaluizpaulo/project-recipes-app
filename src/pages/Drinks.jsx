import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import FetchContext from '../context/FetchContext';
import Cards from '../components/Cards';

function Drinks() {
  const { setTypeFunc, data } = useContext(FetchContext);

  Drinks.displayName = 'Bebidas';

  const fnAlert = (func, message) => {
    func(message);
  };

  if (data === null) {
    const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    return fnAlert(alert, msg);
  }

  if (data !== null && data.length === 1) {
    return <Redirect to={ `/bebidas/${data[0].idDrink}` } />;
  }

  return (
    <div>
      { setTypeFunc('Drinks') }
      <Header title={ Drinks.displayName } />
      { data.length > 0 && <Cards /> }
    </div>
  );
}

export default Drinks;
