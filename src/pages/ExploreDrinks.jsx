import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderSearch from '../components/HeaderSearch';
import fetchRandomDrink from '../RequisiçõesAPI/drink/RequestRandomDrink';

export default function ExploreDrinks() {
  const [surpriseDrink, setSurpriseDrink] = useState();
  const history = useHistory();

  useEffect(() => {
    const handleSurpriseDrink = async () => {
      const response = await fetchRandomDrink();
      const result = await response.drinks;
      setSurpriseDrink(result[0].idDrink);
    };
    handleSurpriseDrink();
  }, [setSurpriseDrink]);

  return (
    <div>
      <HeaderSearch title="Explorar Bebidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/bebidas/${surpriseDrink}`) }

      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
