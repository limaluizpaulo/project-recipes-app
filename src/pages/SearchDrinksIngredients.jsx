import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../App.css';
import FetchContext from '../context/FetchContext';

function SearchDrinksIngredients() {
  SearchDrinksIngredients.displayName = 'Explorar Ingredientes';
  const { setData, setFilterDrink } = useContext(FetchContext);
  const [drinksIng, setDrinkIng] = useState([]);
  const TWELVE = 12;
  const history = useHistory();
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
    drinksIng.map((ing, index) => (
      <button
        type="button"
        key={ ing.strIngredient1 }
        onClick={ () => {
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing.strIngredient1}`)
            .then((res) => res.json())
            .then(({ drinks }) => setData(drinks));
          setFilterDrink(ing.strIngredient1);
          history.push('/bebidas');
        } }
      >
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ ing.strIngredient1 }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Small.png` }
            alt={ `${ing.strIngredient1}` }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{`${ing.strIngredient1}`}</p>
        </div>
      </button>
    ))
  );
  return (
    <div>
      <Header title={ SearchDrinksIngredients.displayName } />
      {drinksIng.length === 0 ? <h1>Loading...</h1> : renderDrinkIng()}
      <Footer />
    </div>
  );
}

export default SearchDrinksIngredients;
