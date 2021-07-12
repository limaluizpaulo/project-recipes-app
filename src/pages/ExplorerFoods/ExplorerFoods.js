import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function ExplorerFoods() {
  const [idMeal, setIdMeal] = useState();
  const history = useHistory();

  useEffect(() => {
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

      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>

      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/comidas/${idMeal}`) }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExplorerFoods;
