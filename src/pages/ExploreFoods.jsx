import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

function ExploreFoods() {
  const history = useHistory();
  const { recipes, setIdDetail } = useContext(RecipeContext);
  const [setRecipeUrl] = useFetchRecipesApi();
  const BASE_URL_RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';

  useEffect(() => {
    setRecipeUrl(BASE_URL_RANDOM_MEAL);
  }, []);

  return (
    <div>
      {(recipes[0])
      && (
        <>
          <HeaderExplore title="Explorar Comidas" />
          <button
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => history.push('/explorar/comidas/ingredientes') }
          >
            Por Ingredientes
          </button>
          <button
            type="button"
            data-testid="explore-by-area"
            onClick={ () => history.push('/explorar/comidas/area') }
          >
            Por Local de Origem
          </button>
          <Link to={ `/comidas/${recipes[0].idMeal}` }>
            <button
              type="button"
              data-testid="explore-surprise"
              onClick={ () => setIdDetail(recipes[0].idMeal) }
            >
              Me Surpreenda!
            </button>
          </Link>
          <Footer />
        </>)}
    </div>
  );
}

export default ExploreFoods;
