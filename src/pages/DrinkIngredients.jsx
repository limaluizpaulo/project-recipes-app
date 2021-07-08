import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context';

function DrinkIngredients() {
  const { ingredients, setSearchIngredient } = useContext(RecipeContext);

  function renderIngredients() {
    return (
      <>
        {ingredients.map((ingredient, index) => (
          <Link
            to="/bebidas"
            key={ ingredient.strIngredient1 }
            onClick={ () => setSearchIngredient(ingredient.strIngredient1) }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ ingredient.imgSrc }
                alt={ ingredient.strIngredient1 }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
            </div>
          </Link>
        ))}
      </>
    );
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      { ingredients.length > 0 && renderIngredients() }
      <Footer />
    </div>
  );
}

export default DrinkIngredients;
