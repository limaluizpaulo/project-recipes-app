import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
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

  if ((!drinksIngre.length)) {
    return (<ClipLoader
      size="120px"
      css="margin: 250px 130px"
    />);
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="recipe-container">

        {drinksIngre.map((ingre, index) => (<CardIngre
          data={ ingre }
          index={ index }
          key={ index }
        />))}
      </div>
      <Footer />
    </div>
  );
}
