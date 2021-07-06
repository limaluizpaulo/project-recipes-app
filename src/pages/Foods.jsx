import React, { useContext } from 'react';
import Context from '../context/Context';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import CategoryBtn from '../components/CategoryBtn';

const URL = 'https://www.themealdb.com/api/json/v1/1/';

function Foods() {
  const { meals,
    categories,
    manageRenderMeal,
    filterCategory,
    filterToggler,
  } = useContext(Context);
  const maxRecipe = 12;
  const maxCategory = 5;
  const render = meals.length > 0 && categories;

  const foodList = () => meals.slice(0, maxRecipe).map((meal, index) => (
    RecipeCard(meal, index)));

  const categoryList = () => categories.meals.slice(0, maxCategory)
    .map(({ strCategory }) => (
      CategoryBtn(strCategory, filterCategory, filterToggler, URL)));
  const renderList = (
    <div>
      <div>
        {categoryList()}
      </div>
      <div className="recipe-list">
        {foodList()}
      </div>
    </div>
  );
  return (
    <>
      <div>Tela de Comidas</div>
      <Header title="Comidas" />
      <HeaderSearchButton baseEndPoint={ URL } />
      {render ? manageRenderMeal(renderList) : <div>Loading</div>}
      <Footer />
    </>
  );
}

export default Foods;
