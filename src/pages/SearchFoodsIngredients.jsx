import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function SearchFoodsIngredients() {
  SearchFoodsIngredients.displayName = 'Explorar Ingredientes';
  const [mealsIng, setMealsIng] = useState([]);
  const TWELVE = 12;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const result = await response.json();
        const data = (result.meals.slice(0, TWELVE));
        setMealsIng([...data]);
      } catch (error) {
        return Error(error);
      }
    };
    fetchMeals();
  }, []);

  const renderMealsIng = () => (
    mealsIng.map((meals, index) => (
      <Link to="/comidas" key={ meals.strIngredient }>
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ meals.strIngredient }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${meals.strIngredient}-Small.png` }
            alt={ `${meals.strIngredient}` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{`${meals.strIngredient}`}</p>
        </div>
      </Link>
    ))
  );
  return (
    <div>
      <Header title={ SearchFoodsIngredients.displayName } />
      {renderMealsIng()}
      <Footer />
    </div>
  );
}

export default SearchFoodsIngredients;
