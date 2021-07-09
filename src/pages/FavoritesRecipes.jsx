import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import HeaderSearch from '../components/HeaderSearch';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoritesRecipes() {
  const [favorite, setFavorite] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(storage);
    if (storage !== null) {
      setFavorite(storage);
    }
    console.log(favorite);
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage !== null && storage.some((favoriteId) => favoriteId.id)) {
      setIsFavorite(true);
    }
  }, []);

  const handleFavorite = (favoriteId) => {
    if (isFavorite) {
      const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavorite = favoriteList.filter((data) => data.id !== favoriteId.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
      setFavorite(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  };

  const handleCopyLink = (favoriteId) => {
    copy(`http://localhost:3000/${favoriteId.type}s/${favoriteId.id}`);
    setIsCopy(true);
  };

  if (favorite.length === 0) {
    return (
      <div>
        <HeaderSearch title="Receitas Favoritas" />
        <p>Você não tem receitas favoritas</p>
        <button
          type="button"
          onClick={ () => history.push('/Comidas') }
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div>
      {console.log(favorite)}
      <HeaderSearch title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        // onClick={ }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        // onClick={ }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        // onClick={ }
      >
        Drink
      </button>
      { favorite.map((favorites, index) => (
        <div key={ index }>
          <button
            type="button"
            onClick={ () => history.push(`/${favorites.type}s/${favorites.id}`) }
          >
            <img
              width="100"
              data-testid={ `${index}-horizontal-image` }
              src={ favorites.image }
              alt={ favorites.name }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {(favorites.type === 'comida')
                ? `${favorites.area} - ${favorites.category}`
                : favorites.alcoholicOrNot}
            </p>
          </button>
          <button
            type="button"
            onClick={ () => history.push(`/${favorites.type}s/${favorites.id}`) }
          >
            <h2 data-testid={ `${index}-horizontal-name` }>{favorites.name}</h2>
          </button>

          <div>
            <button
              onClick={ () => handleCopyLink(favorites) }
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt={ favorites.name }
              />
            </button>
            <span>
              { isCopy && (<p>Link copiado!</p>)}
            </span>
          </div>
          <div>
            <button
              type="button"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              onClick={ () => handleFavorite(favorites) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                name={ favorites.id }
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                alt="favorite logo"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
