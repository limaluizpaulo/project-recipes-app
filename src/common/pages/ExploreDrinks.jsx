import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header/Header';
import { fetchAPI, SUPRISE_ME_DRINKS } from '../../services/index';
import store, { addRecDetail, setLoading } from '../../context/store';

export default function ExploreMeals() {
  const history = useHistory();
  const { setRecipes } = useContext(store);
  async function handleClic() {
    const drinksDetails = await fetchAPI(SUPRISE_ME_DRINKS);
    console.log(drinksDetails.drinks[0].idDrink);
    setRecipes(addRecDetail(drinksDetails.drinks));
    setRecipes(setLoading(true));
    history.push(`/bebidas/${drinksDetails.drinks[0].idDrink}`);
  }
  return (
    <div>
      <Header pageName="Explorar Bebidas " />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes

        </button>
      </Link>
      <br />
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => handleClic() }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}
