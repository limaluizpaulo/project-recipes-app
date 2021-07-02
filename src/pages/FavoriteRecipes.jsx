import React, { useEffect, useState } from 'react';
import { FavoriteBtn, ShareBtn } from '../components';

function FavoriteRecipes() {
  const [allFavorites, setAllFavorites] = useState([]);
  const [wasCopied, setWasCopied] = useState(false);
  const [recipesToRender, setRecipesToRender] = useState([]);

  useEffect(() => {
    setAllFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setRecipesToRender(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const filterRecipes = (recipeType) => {
    setRecipesToRender(allFavorites.filter(({ type }) => type === recipeType));
  };

  return (
    <>
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => { setRecipesToRender(allFavorites); } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('comida') }
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('bebida') }
        >
          Bebidas
        </button>
      </section>

      <section>
        {wasCopied && <span>Link copiado!</span>}
        {recipesToRender.map((el, idx) => {
          const { id, type, area, category, alcoholicOrNot, name, image } = el;

          return (
            <section key={ idx }>
              <p data-testid={ `${idx}-horizontal-top-text` }>
                {`${area} - ${category} ${alcoholicOrNot}`}
              </p>

              <a href={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt="Foto da receita"
                  data-testid={ `${idx}-horizontal-image` }
                />
                <p data-testid={ `${idx}-horizontal-name` }>{name}</p>
              </a>
              <ShareBtn
                showCopiedMsg={ setWasCopied }
                testId={ `${idx}-horizontal-share-btn` }
              />
              <FavoriteBtn
                id={ id }
                type={ type === 'comida' ? 'meals' : 'drinks' }
                currentRecipe={ el }
                testId={ `${idx}-horizontal-favorite-btn` }
              />
            </section>

          );
        })}
      </section>
    </>
  );
}

export default FavoriteRecipes;
