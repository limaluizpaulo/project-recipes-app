import React, { useContext, useEffect, useState } from 'react';
import MainCards from '../components/MainCards';
import RecipesContext from '../contexts/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../images/mustachef.svg';
import { getMealsRecipes, getRecipesByIng } from '../helpers/MealsAPI';
import { getCocktailsRecipes } from '../helpers/CocktailsAPI';
// verificar o setdata nas categorias, e verificar imagens no exploreingredient
export default function MainPage() {
  const { data, setData, type, ingredient } = useContext(RecipesContext);
  const [dataMainPage, setDataMainPage] = useState([]);
  const maxCards = 12;

  useEffect(() => {
    const recipes = async () => {
      const results = (type === 'meals')
        ? await getMealsRecipes() : await getCocktailsRecipes();
      /*
      results.reduce((acc, item) => {
        if (acc.length < maxCards) {
          acc.push(item);
        }
        return acc;
      }, []); */
      setDataMainPage(results.filter((item, index) => index < maxCards)); //  refatorar para stopar ao atingir o maxCards
    };

    const fetchRecipesByIngredient = async () => {
      const recipesIngredients = await getRecipesByIng(ingredient, type);
      setDataMainPage(recipesIngredients);
    };

    if (ingredient === '') {
      recipes();
    } else {
      fetchRecipesByIngredient();
    }
    console.log(dataMainPage);
  }, [ingredient]);

  console.log(dataMainPage);

  let title;
  let thumbnail;
  let strTitle;
  let typeId;

  if (type === 'meals') {
    title = 'Comidas';
    strTitle = 'strMeal';
    thumbnail = 'strMealThumb';
    typeId = 'idMeal';
  } else {
    title = 'Bebidas';
    strTitle = 'strDrink';
    thumbnail = 'strDrinkThumb';
    typeId = 'idDrink';
  }

  return dataMainPage ? (
    <>
      <Header title={ title } hasSearchBar />
      <div className="transparent">
        <MainCards
          data={ dataMainPage }
          thumbnail={ thumbnail }
          title={ strTitle }
          typeId={ typeId }
        />
      </div>
      <Footer />
    </>
  ) : (
    <div className="loading transparent">
      <img src={ logo } alt="Loading" />
    </div>
  );
}
