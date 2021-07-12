import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

function ExploreDrinks() {
  const history = useHistory();
  const { recipes, setIdDetail } = useContext(RecipeContext);
  const [setRecipeUrl] = useFetchRecipesApi();
  const BASE_URL_RANDOM_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  useEffect(() => {
    setRecipeUrl(BASE_URL_RANDOM_DRINK);
  }, []);

  return (
    <div>
      {(recipes[0])
      && (
        <>
          <Header title="Explorar Bebidas" search={ false } />
          <button
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          >
            Por Ingredientes
          </button>
          <Link to={ `/bebidas/${recipes[0].idDrink}` }>
            <button
              type="button"
              data-testid="explore-surprise"
              onClick={ () => setIdDetail(recipes[0].idDrink) }
            >
              Me Surpreenda!
            </button>
          </Link>
          <Footer />
        </>)}
    </div>
  );
}

export default ExploreDrinks;
