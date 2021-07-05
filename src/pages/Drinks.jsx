import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import FetchContext from '../context/FetchContext';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { categoryListDrink, fetchDrinksList } from '../services/Api';
import Category from '../components/Category';

function Drinks() {
  const {
    setTypeFunc, data, setData, setNameRecipes, setImgRecipes, setCategories,
  } = useContext(FetchContext);

  Drinks.displayName = 'Bebidas';

  const renderCategorys = () => {
    categoryListDrink().then((res) => setCategories(res));
  };

  useEffect(() => {
    renderCategorys();
  }, []);

  const fnAlert = (func, message) => {
    func(message);
  };

  if (data === null) {
    const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    return fnAlert(alert, msg);
  }

  if (data.length === 1 && data[0].idMeal !== '52968') {
    return <Redirect to={ `/bebidas/${data[0].idMeal}` } />;
  }

  const renderDrinks = () => {
    setNameRecipes('strDrink');
    setImgRecipes('strDrinkThumb');
    fetchDrinksList().then((res) => setData(res));
  };

  return (
    <div>
      { setTypeFunc('Drinks') }
      <Header title={ Drinks.displayName } />
      <Category />
      { data.length === 0 && renderDrinks() }
      <Cards />
      <Footer />
    </div>
  );
}

export default Drinks;
