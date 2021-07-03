import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderSearch from '../components/HeaderSearch';
import fetchIngredientsFood from '../RequisiçõesAPI/food/RequestByIngredients';

export default function FoodIngredients() {
  const [foodIngredients, setFoodIngredients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const handleFoodIngredients = async () => {
      const zero = 0;
      const twelve = 12;
      const response = await fetchIngredientsFood();
      const result = await response.meals;
      const twelveIngredients = result.slice(zero, twelve);
      setFoodIngredients(twelveIngredients);
    };
    handleFoodIngredients();
  }, []);

  // const handleClick = (id) => {
  //   history.push(`/comidas/${id}`);
  // }

  return (
    <div>
      {/* {console.log(foodIngredients)} */}
      <HeaderSearch title="Explorar Ingredientes" />
      { foodIngredients.map((i, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => history.push('/comidas') }
        >
          <img
            key={ index }
            data-testid={ `${index}-card-img` }
            alt="ingredient"
            src={ `https://www.themealdb.com/images/ingredients/${i.strIngredient}-Small.png` }
          />
          <p data-testid={ `${index}-card-name` }>{i.strIngredient}</p>
        </button>
      ))}

      <Footer />

    </div>
  );
}
