import React, { useState, useEffect } from 'react';
import { fetchIngreMeals } from '../services/mealsApi';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardIngre from '../components/CardIngre';

export default function MealsByIngre() {
  const [mealsIngre, setMealsIngre] = useState([]);
  useEffect(() => {
    const TWELVE = 12;
    fetchIngreMeals()
      .then((res) => setMealsIngre(res.slice(0, TWELVE)));
  }, []);
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {mealsIngre.map((ingre, index) => (<CardIngre
        data={ ingre }
        index={ index }
        key={ index }
      />))}
      <Footer />
    </div>
  );
}
