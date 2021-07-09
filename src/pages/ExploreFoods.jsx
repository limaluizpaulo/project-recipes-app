import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderSearch from '../components/HeaderSearch';
import fetchRandomFood from '../RequisiçõesAPI/food/RequestRandomFood';

export default function ExploreFoods() {
  const [surpriseFood, setSurpriseFood] = useState();
  const history = useHistory();

  useEffect(() => {
    const handleSurpriseFood = async () => {
      const response = await fetchRandomFood();
      const result = await response.meals;
      setSurpriseFood(result[0].idMeal);
    };
    handleSurpriseFood();
  }, [setSurpriseFood]);

  return (
    <div>
      <HeaderSearch title="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
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
        onClick={ () => history.push(`/comidas/${surpriseFood}`) }

      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
