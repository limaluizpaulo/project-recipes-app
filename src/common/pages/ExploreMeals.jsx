import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { fetchAPI, SUPRISE_ME_MEALS } from '../../services/index';
import store, { addRecDetail, setLoading } from '../../context/store';

export default function ExploreMeals() {
  const history = useHistory();
  const { setRecipes } = useContext(store);
  async function handleClic() {
    const mealsDetails = await fetchAPI(SUPRISE_ME_MEALS);
    setRecipes(addRecDetail(mealsDetails.meals));
    setRecipes(setLoading(true));
    history.push(`/comidas/${mealsDetails.meals[0].idMeal}`);
  }
  return (
    <div>
      <Header pageName="Explorar comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes

        </button>
      </Link>
      <br />
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
      </Link>
      <br />
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => handleClic() }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
