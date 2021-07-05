import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import FetchContext from '../context/FetchContext';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { fetchDrinksList } from '../services/Api';

function Drinks() {
  const { setTypeFunc, data, setData, setNameRecipes, setImgRecipes} = useContext(FetchContext);

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

  const renderDrinks = () => {
    setNameRecipes('strDrink');
    setImgRecipes('strDrinkThumb');   
    fetchDrinksList().then((res) => setData(res))
  }

  return (
    <div>
      { setTypeFunc('Drinks') }
      <Header title={ Drinks.displayName } />
      { data.length === 0 &&  renderDrinks() }
      <Cards />
      <Footer />
    </div>
  );
}

export default Drinks;
