import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderSearch from '../components/HeaderSearch';
// import AppContext from '../ContextApi/Context';
import fetchIngredientsDrinks from '../RequisiçõesAPI/drink/RequestByIngredients';

export default function DrinkIngredients() {
  // const { listOfContext: { state: { api: { drink: ingredients } } } } = useContext(AppContext);
  const [drinkIngredients, setDrinkIngredients] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const handleDrinkIngredients = async () => {
      const zero = 0;
      const twelve = 12;
      const response = await fetchIngredientsDrinks();
      const result = await response.drinks;
      const twelveIngredients = result.slice(zero, twelve);
      setDrinkIngredients(twelveIngredients);
    };
    handleDrinkIngredients();
  }, []);

  return (
    <div>
      <HeaderSearch title="Explorar Ingredientes" />
      { drinkIngredients.map((i, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => history.push('/bebidas') }
        >
          <img
            key={ index }
            data-testid={ `${index}-card-img` }
            alt="ingredient"
            src={ `https://www.thecocktaildb.com/images/ingredients/${i.strIngredient1}-Small.png` }
          />
          <p data-testid={ `${index}-card-name` }>{i.strIngredient1}</p>
        </button>
      ))}
      <Footer />

    </div>
  );
}
