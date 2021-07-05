import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function ExplorerFoods() {

  const [idMeal, setIdMeal] = useState();

  useEffect(() => {
    console.log('dentro de useEffectExplorar')
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((food) => {
      setIdMeal(food.meals[0].idMeal);
    });
  },
  []);
  return (
    <div>
      <Header title="Explorar Comidas" />
      <h1>Ex Comidas</h1>

      <Link to="/explorar/comidas/ingredientes" data-testid="explore-by-ingredient" >
        <buttom type="buttom">Por Ingredientes</buttom>
      </Link>
      <Link to="/explorar/comidas/area" data-testid="explore-by-area" >
        <buttom type="buttom">Por Local de Origem</buttom>
      </Link>

      <Link to={`/comidas/${idMeal}`} data-testid="explore-surprise" >
        <button type="button">Me Surpreenda!</button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorerFoods;
