import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchRecipeRandomFood } from '../../services/recipeAPI';

export default function ExploreFood() {
  const history = useHistory();
  const [randomRecipe, setRandomRecipe] = useState({});
  const [change, setChange] = useState(true);

  async function handleClickRandomRecipe() {
    setChange(!change);
    const id = Object.values(randomRecipe.meals[0])[0];
    history.push(`/comidas/${id}`);
  }

  useEffect(() => {
    const func = async () => {
      const fun = await fetchRecipeRandomFood();
      setRandomRecipe(fun);
    };
    func();
  }, [change]);

  return (
    <div>
      <Header title="Explorar Comidas" display="false" />
      <div className="div-explore-food-drink">
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
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClickRandomRecipe }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}
