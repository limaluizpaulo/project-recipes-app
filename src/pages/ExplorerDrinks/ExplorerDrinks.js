import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function ExplorerDrinks() {
  const [idDrink, setIdDrink] = useState();
  const history = useHistory();
  useEffect(() => {
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
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.pushState('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        onClick={ () => history.pushState(`/bebidas/${idDrink}`) }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExplorerDrinks;
