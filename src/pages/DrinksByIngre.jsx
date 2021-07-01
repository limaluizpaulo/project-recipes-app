import React, { useState, useEffect } from 'react';
import { fetchIngreDrinks } from '../services/drinksApi';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardIngre from '../components/CardIngre';

export default function DrinksByIngre() {
  const [drinksIngre, setDrinksIngre] = useState([]);
  useEffect(() => {
    const TWELVE = 12;
    fetchIngreDrinks()
      .then((res) => setDrinksIngre(res.slice(0, TWELVE)));
  }, []);
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {drinksIngre.map((ingre, index) => (<CardIngre
        data={ ingre }
        index={ index }
        key={ index }
      />))}
      <Footer />
    </div>
  );
}
