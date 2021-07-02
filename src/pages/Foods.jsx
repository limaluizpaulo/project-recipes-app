import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import FetchContext from '../context/FetchContext';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

function Foods() {
  const { setTypeFunc, data } = useContext(FetchContext);

  Foods.displayName = 'Comidas';

  const fnAlert = (func, message) => {
    func(message);
  };

  if (data === null) {
    const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    return fnAlert(alert, msg);
  }

  if (data.length === 1) {
    return <Redirect to={ `/comidas/${data[0].idMeal}` } />;
  }

  return (
    <div>
      { setTypeFunc('Foods')}
      <Header title={ Foods.displayName } />
      { data.length > 0 && <Cards />}
      <Footer />
    </div>
  );
}

export default Foods;
