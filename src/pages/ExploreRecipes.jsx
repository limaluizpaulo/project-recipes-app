import React from 'react';
import Footer from '../components/Footer';
import MealsByArea from '../components/MealsByArea';

export default function Explore() {
  // handleComponent({target}) {
  //   switch (target.name) {
  //     case "MealsByIngredients":
  //       return <MealsByIngredients />;
  //     case "MealsByArea":
  //       return <MealsByArea />;
  //     case "MealsRandom":
  //       return <MealsRandom />;
  //     default:
  //       // return null;
  //   }
  // }

  return (
    <main>
      {/* <Header /> */}
      <button
        name="MealsByIngradient"
        type="button"
        // onClick={}
      >
        Por Ingrediente
      </button>
      <MealsByArea />
      <button
        name="MealsByIngradient"
        type="button"
      >
        Por Local de Origem
      </button>
      <button
        name="MealsByIngradient"
        type="button"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </main>
  );
}
