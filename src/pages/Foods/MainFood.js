import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeList from '../../components/RecipeList';
// import { fetchRecipeAllFood } from '../../services/recipeAPI';

export default function MainFood() {
  // useEffect(() => {
  //   const func = async () =>{
  //     await fetchRecipeAllFood();
  //   }
  // }, []);

  return (
    <div
      className="main-food-class"
    >
      <Header title="Comidas" display="true" />
      <RecipeList />
      <Footer />
    </div>
  );
}
