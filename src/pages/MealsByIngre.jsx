import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
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

  if ((!mealsIngre.length)) {
    return (<ClipLoader
      size="120px"
      css="margin: 250px 130px"
    />);
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="recipe-container">
        {mealsIngre.map((ingre, index) => (<CardIngre
          data={ ingre }
          index={ index }
          key={ index }
        />))}
      </div>
      <Footer />
    </div>
  );
}
