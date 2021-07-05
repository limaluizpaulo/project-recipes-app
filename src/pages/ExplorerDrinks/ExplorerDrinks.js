import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function ExplorerDrinks() {

  const [idDrink, setIdDrink] = useState();

  useEffect(() => {
    console.log('dentro de useEffectExplorar')
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((food) => {
      setIdDrink(food.drinks[0].idDrink);
    });
  },
  []);

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <h1>Ex Bebidas</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <button data-testid="explore-by-ingredient" type="button">Por Ingredientes</button>
      </Link>
      <Link to={`/bebidas/${idDrink}`} data-testid="explore-surprise">
        <button type="button">Me Surpreenda!</button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorerDrinks;
