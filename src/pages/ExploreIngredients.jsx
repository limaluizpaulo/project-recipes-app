import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getMealsIngredients } from '../helpers/MealsAPI';
import logo from '../images/mustachef.svg';
import RecipesContext from '../contexts/RecipesContext';

export default function ExploreIngredients() {
  const { type, setIngredient, ingredient } = useContext(RecipesContext);
  const [dataIngredients, setDataIngredients] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const maxCards = 12;
  const history = useHistory();
  const { pathname } = useLocation();
  const ingredientPathname = pathname.includes('comidas') ? '/comidas' : '/bebidas';

  // const fetchRecipesByIngredient = async (ingredient, paramType) => {
  //   const recipes = await getRecipesByIng(ingredient, paramType);
  //   setData(recipes);
  // };

  useEffect(() => {
    const ingredients = async () => {
      setIsFetching(true);
      // console.log(type);
      const result = await getMealsIngredients(type);
      setDataIngredients(result.filter((item, index) => index < maxCards));
      setIsFetching(false);
    };
    ingredients();
  }, []);

  // const title = {
  //   meals: strIngredient,
  //   drinks: strIngredient1,
  // };
  useEffect(() => {
    if (ingredient !== '') {
      history.push(ingredientPathname);
    }
  }, [ingredient]);

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
              setIngredient(ingrediente.strIngredient || ingrediente.strIngredient1);
              // history.push(ingredientPathname);
            } }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="100"
              alt={ ingrediente.strIngredient || ingrediente.strIngredient1 }
              src={
                type === 'meals'
                  ? `https://www.themealdb.com/images/ingredients/${ingrediente.strIngredient}-Small.png`
                  : `https://www.thecocktaildb.com/images/ingredients/${ingrediente.strIngredient1}-Small.png`
              }
            />
            <span
              data-testid={ `${index}-card-name` }
            >
              { ingrediente.strIngredient || ingrediente.strIngredient1 }
            </span>
          </button>
        )) }
      </div>
      <Footer />
    </>
  );
}
