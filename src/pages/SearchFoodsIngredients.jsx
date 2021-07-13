import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FetchContext from '../context/FetchContext';

function SearchFoodsIngredients() {
  SearchFoodsIngredients.displayName = 'Explorar Ingredientes';
  const { setFilterMeals, setData } = useContext(FetchContext);
  const [mealsIng, setMealsIng] = useState([]);

  const TWELVE = 12;
  const history = useHistory();
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
    mealsIng.map((ing, index) => (
      <button
        type="button"
        key={ ing.strIngredient }
        onClick={ () => {
          fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing.strIngredient}`)
            .then((res) => res.json())
            .then(({ meals }) => setData(meals));
          setFilterMeals(ing.strIngredient);
          history.push('/comidas');
          console.log(ing.strIngredient);
        } }
      >
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ ing.strIngredient }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png` }
            alt={ `${ing.strIngredient}` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{`${ing.strIngredient}`}</p>
        </div>
      </button>
    ))
  );
  return (
    <div>
      <Header title={ SearchFoodsIngredients.displayName } />
      { mealsIng.length === 0 ? <h1>Loading...</h1> : renderMealsIng()}
      <Footer />
    </div>
  );
}

export default SearchFoodsIngredients;
