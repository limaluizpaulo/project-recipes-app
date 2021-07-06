import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import CategoryBtn from '../components/CategoryBtn';

function Drinks() {
  const {
    drinks,
    categories,
    manageRenderDrink,
    filterCategoryDrinks,
    updateEndPoint,
    resetParams,
  } = useContext(Context);

  useEffect(() => {
    updateEndPoint('drinks');
  }, [updateEndPoint]);

  useEffect(() => () => resetParams(), []);

  const maxRecipe = 12;
  const maxCategory = 5;
  const render = drinks.length > 0 && categories;

  const drinkList = () => drinks.slice(0, maxRecipe).map((drink, index) => (
    RecipeCard(drink, index)));

  const categoryList = () => categories.drinks.slice(0, maxCategory)
    .map(({ strCategory }) => (
      CategoryBtn(strCategory, filterCategoryDrinks)));
  const renderList = (
    <div>
      <div>
        {categoryList()}
      </div>
      <div className="recipe-list">
        {drinkList()}
      </div>
    </div>
  );

  return (
    <>
      <div>Tela de Bebidas</div>
      <Header title="Bebidas" />
      <HeaderSearchButton />
      {render ? manageRenderDrink(renderList) : <div>Loading...</div>}
      <Footer />
    </>
  );
}

export default Drinks;
