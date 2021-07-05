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

      <buttom
        type="buttom"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </buttom>

      <buttom
        type="buttom"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </buttom>

      <button
        type="button"
        onClick={ () => history.push(`/comidas/${idMeal}`) }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExplorerFoods;
