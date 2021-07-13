import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getMealsIngredients } from '../helpers/MealsAPI';
import logo from '../images/mustachef.svg';
import RecipesContext from '../contexts/RecipesContext';

export default function ExploreIngredients() {
  const { setData, type, setIngredient } = useContext(RecipesContext);
  const [dataIngredients, setDataIngredients] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const maxCards = 12;
  const history = useHistory();
  const { pathname } = useLocation();
  const ingredientPathname = pathname.includes('comidas') ? '/comidas' : '/bebidas';

  useEffect(() => {
    const ingredients = async () => {
      setIsFetching(true);
      const result = await getMealsIngredients(type);
      setDataIngredients(result.filter((item, index) => index < maxCards));
      setIsFetching(false);
    };
    ingredients();
  }, []);

  return isFetching ? (
    <div className="loading transparent">
      <img src={ logo } alt="Loading" />
    </div>
  ) : (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="transparent">
        { dataIngredients.map((ingrediente, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => {
              setIngredient(ingrediente.strIngredient);
              history.push(ingredientPathname);
            } }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="100"
              alt={ ingrediente.strIngredient }
              src={ `https://www.themealdb.com/images/ingredients/${ingrediente.strIngredient}.png` }
            />
            <span
              data-testid={ `${index}-card-name` }
            >
              { ingrediente.strIngredient }
            </span>
          </button>
        )) }
      </div>
      <Footer />
    </>
  );
}
