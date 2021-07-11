import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function SearchDrinksIngredients() {
  SearchDrinksIngredients.displayName = 'Explorar Ingredientes';
  const [drinksIng, setDrinkIng] = useState([]);
  const TWELVE = 12;

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        const result = await response.json();
        const data = (result.drinks.slice(0, TWELVE));
        setDrinkIng([...data]);
      } catch (error) {
        return Error(error);
      }
    };
    fetchDrinks();
  }, []);

  const renderDrinkIng = () => (
    drinksIng.map((drinks, index) => (
      <Link to="/bebidas" key={ drinks.strIngredient1 }>
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ drinks.strIngredient1 }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${drinks.strIngredient1}-Small.png` }
            alt={ `${drinks.strIngredient1}` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{`${drinks.strIngredient1}`}</p>
        </div>
      </Link>
    ))
  );
  return (
    <div>
      <Header title={ SearchDrinksIngredients.displayName } />
      {renderDrinkIng()}
      <Footer />
    </div>
  );
}

export default SearchDrinksIngredients;
