import React, { useContext } from 'react';
import MainCards from '../components/MainCards';
import RecipesContext from '../contexts/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainPage() {
  const { data, isFetching, type } = useContext(RecipesContext);
  let title;
  let thumbnail;
  let strTitle;

  if (type === 'meal') {
    title = 'Comidas';
    strTitle = 'strMeal';
    thumbnail = 'strMealThumb';
  } else {
    title = 'Bebidas';
    strTitle = 'strDrink';
    thumbnail = 'strDrinkThumb';
  }

  return isFetching ? <p>Loading...</p> : (
    <>
      <Header title={ title } hasSearchBar />
      <MainCards
        data={ data }
        thumbnail={ thumbnail }
        title={ strTitle }
      />
      <Footer />
    </>
  );
}
