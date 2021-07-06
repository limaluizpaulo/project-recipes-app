import React, { useContext } from 'react';
import Context from '../context/Context';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import CategoryBtn from '../components/CategoryBtn';

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

function Drinks() {
  const {
    drinks,
    categories,
    manageRenderDrink,
    filterCategoryDrinks,
    filterToggler,
  } = useContext(Context);

  const maxRecipe = 12;
  const maxCategory = 5;
  const render = drinks.length > 0 && categories;
  console.log(drinks);
  const drinkList = () => drinks.slice(0, maxRecipe).map((drink, index) => (
    RecipeCard(drink, index)));
  const categoryList = () => categories.drinks.slice(0, maxCategory)
    .map(({ strCategory }) => (
      CategoryBtn(strCategory, filterCategoryDrinks, filterToggler, URL)));
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
      <HeaderSearchButton baseEndPoint={ URL } />
      {render ? manageRenderDrink(renderList) : <div>Loading...</div>}
      <Footer />
    </>
  );
}

export default Drinks;
