import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import FetchContext from '../context/FetchContext';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { categoryListMeal, fetchRecipesList } from '../services/Api';
import Category from '../components/Category';
import '../App.css';

function Foods() {
  const {
    setTypeFunc, data, setData, setNameRecipes, setImgRecipes, setCategories, setIdRecip,
    filterMeals,
  } = useContext(FetchContext);

  Foods.displayName = 'Comidas';

  useEffect(() => {
    const renderCategorys = () => {
      categoryListMeal().then((res) => setCategories(res));
    };

    renderCategorys();
  }, [setCategories]);

  const fnAlert = (func, message) => {
    func(message);
  };

  if (data === null) {
    const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    return fnAlert(alert, msg);
  }

  if (data.length === 1 && data[0].idMeal !== '52968') {
    return <Redirect to={ `/comidas/${data[0].idMeal}` } />;
  }

  const renderRecipes = () => {
    setNameRecipes('strMeal');
    setImgRecipes('strMealThumb');
    setIdRecip('idMeal');
    if (filterMeals === null) { fetchRecipesList().then((res) => setData(res)); }
  };

  return (
    <div>
      { setTypeFunc('comidas')}
      <Header title={ Foods.displayName } />
      <button
        type="button"
        className="category"
        onClick={ renderRecipes }
        data-testid="All-category-filter"
      >
        All
      </button>
      <Category />
      { data.length === 0 && renderRecipes() }
      <Cards />
      <Footer />
    </div>
  );
}

export default Foods;
