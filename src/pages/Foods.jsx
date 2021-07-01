import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import FetchContext from '../context/FetchContext';

function Foods() {
  const { setTypeFunc, data } = useContext(FetchContext);

  Foods.displayName = 'Comidas';

  if (data.length === 1) {
    return <Redirect to={ `/comidas/${data[0].idMeal}` } />;
  }

  return (
    <div>
      { setTypeFunc('Foods') }
      <Header title={ Foods.displayName } />
    </div>
  );
}

export default Foods;
