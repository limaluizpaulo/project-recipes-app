import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { GlobalContext } from '../context/Provider';
import Footer from '../components/Footer';

const Drinks = () => {
  const { recipes: { drinks = [] } } = useContext(GlobalContext);
  const [defaultDrinks, setDefaultDrinks] = useState([]);

  useEffect(() => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetch(URL)
      .then((res) => res.json())
      .then(({ drinks: data }) => setDefaultDrinks(data));
  }, []);

  const renderCard = () => {
    const magic = 12;
    const recipes = drinks.length ? drinks : defaultDrinks;
    const newRecipes = recipes.filter((_, idx) => idx < magic);
    return newRecipes.map(({ strDrinkThumb, strDrink }, index) => (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <img data-testid={ `${index}-card-img` } src={ strDrinkThumb } alt={ strDrink } />
        <p data-testid={ `${index}-card-name` }>{strDrink}</p>
      </div>
    ));
  };

  return (
    <div>
      <Header title="Bebidas" search />
      {renderCard().length && renderCard()}
      <Footer />
    </div>
  );
};

export default Drinks;
