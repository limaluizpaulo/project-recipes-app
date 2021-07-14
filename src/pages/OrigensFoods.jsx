import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Cards from '../components/Cards';
import DropDownArea from '../components/DropDownArea';
import Footer from '../components/Footer';
import HeaderSearch from '../components/Header';
import FetchContext from '../context/FetchContext';
import { fetchRecipesList } from '../services/Api';

function OrigensFoods() {
  OrigensFoods.displayName = 'Explorar Origem';
  const { data, setData } = useContext(FetchContext);
  const TWELVE = 12;

  const areaCards = () => (
    <div>
      { data && data.slice(0, TWELVE).map((food, index) => (
        <Link
          to={ `/comidas/${food.idMeal}` }
          key={ food.idMeal }
        >
          <div
            data-testid={ `${index}-recipe-card` }
            key={ food.idMeal }
          >
            <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
            <img
              width="150px;"
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ food.strMeal }
            />
          </div>
        </Link>
      ))}
    </div>);

  const loading = () => (<h1>Loading...</h1>);
  const renderRecipes = () => {
    fetchRecipesList().then((res) => setData(res));
  };
  useEffect(renderRecipes, []);

  return (
    <div>
      <HeaderSearch title={ OrigensFoods.displayName } />
      <DropDownArea data={ data } />
      { !data ? loading() : areaCards()}
      <Footer />
    </div>
  );
}

export default OrigensFoods;
