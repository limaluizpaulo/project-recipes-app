import React, { useEffect, useState } from 'react';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [favoriteRecepies, setFavoriteRecepies] = useState([]);

  useEffect(() => {
    setFavoriteRecepies(JSON.parse(localStorage
      .getItem('favoriteRecipes')));
    console.log(favoriteRecepies);
  }, []);
  return (

    <div>
      <Header title="Receitas Favoritas" classname="displaynone" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      { favoriteRecepies.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            style={ { width: '20px' } }
            src={ recipe.image }
            alt={ `Imagem da receita ${recipe.name}` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>recipe.category</p>
          <p data-testid={ `${index}-horizontal-name` }>recipe.name</p>
          <img
            src={ shareIcon }
            alt="Ícone para compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <img
            src={ blackHeartIcon }
            alt="Ícone para compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </div>
      ))}
    </div>
  );
}
