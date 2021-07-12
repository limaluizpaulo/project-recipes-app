import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchRecipeIngredientsDrink } from '../../services/recipeAPI';

function ExploreIngredientsDrink() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const func = async () => {
      const fun = await fetchRecipeIngredientsDrink();
      const ingredientName = Object.values(fun.drinks);
      const NUMBER_OF_INGREDIENTS = 12;
      setIngredients(ingredientName.slice(0, NUMBER_OF_INGREDIENTS));
    };
    func();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" display="false" />
      <div className="div-cards-ingredients">
        {ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <div
            role="presentation"
            data-testid={ `${index}-ingredient-card` }
            key={ ingredient.idIngredient }
            style={ { border: 'solid black 1px' } }
            onClick={ () => history
              .push({ pathname: '/bebidas', ingredient: ingredient.strIngredient1 }) }
          >
            <img data-testid={ `${index}-card-img` } width="20px" src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` } alt="" />
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
export default ExploreIngredientsDrink;
