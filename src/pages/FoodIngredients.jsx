import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';
import RecipeContext from '../context';

function FoodIngredients() {
  const { ingredients, setSearchIngredient } = useContext(RecipeContext);

  function renderIngredients() {
    return (
      <>
        {ingredients.map((ingredient, index) => (
          <Link
            to="/comidas"
            key={ ingredient.strIngredient }
            onClick={ () => setSearchIngredient(ingredient.strIngredient) }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ ingredient.imgSrc }
                alt={ ingredient.strIngredient }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</p>
            </div>
          </Link>
        ))}
      </>
    );
  }

  return (
    <div>
      <HeaderExplore title="Explorar Ingredientes" />
      { ingredients.length > 0 && renderIngredients() }
      <Footer />
    </div>
  );
}

export default FoodIngredients;
