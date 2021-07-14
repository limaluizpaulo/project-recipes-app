import React, { useState } from 'react';
import clipboard from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Footer from '../Components/Footer';

function FavoriteRecipes() {
  const recipeSave = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [copy, setCopy] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState(recipeSave);

  const filterRecipes = (option) => {
    const filterSelected = !option
      ? recipeSave
      : recipeSave.filter((recipe) => option === recipe.type);
    setFavoriteRecipes(filterSelected);
  };

  const copyLinkRecipe = (recipe) => {
    clipboard(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopy(true);
  };

  const disfavorRecipe = (id) => {
    const toFavorite = favoriteRecipes.filter((recipe) => id !== recipe.id);
    setFavoriteRecipes(toFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(toFavorite));
  };

  return (
    <div className="tela-profile">
      <Header title="Receitas Favoritas" />
      <section className="menu-favorites">
        <button
          className="btn-favorites"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('') }
        >
          All
        </button>
        <button
          className="btn-favorites"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('comida') }
        >
          Comidas
        </button>
        <button
          className="btn-favorites"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('bebida') }
        >
          Bebidas
        </button>
      </section>

      <div className="items-list">
        {favoriteRecipes.map((recipe, index) => (
          <div className="card" key={ recipe.id }>
            <div className="card-body">
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
              >
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className="btns-f-c">
                <p
                  className=""
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  <Link
                    to={ `/${recipe.type}s/${recipe.id}` }
                    data-testid={ `${index}-horizontal-name` }
                    className="titulos titulo-favorites"
                  >
                    {recipe.name}
                  </Link>
                  {recipe.type === 'comida'
                    ? `${recipe.area} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`}
                </p>
                <button
                  className="btn-search"
                  type="button"
                  onClick={ () => copyLinkRecipe(recipe) }
                >
                  <img
                    src={ shareIcon }
                    alt="Share Button"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                  {copy && <p>Link copiado!</p>}
                </button>

                <button
                  className="btn-search"
                  type="button"
                  onClick={ () => disfavorRecipe(recipe.id) }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Favorite Button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
