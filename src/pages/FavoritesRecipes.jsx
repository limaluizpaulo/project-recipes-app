import React, { useEffect, useState } from 'react';
import Favorited from '../components/Favorited';
import Header from '../components/Header';

import '../styles/DoneRecipes.css';
import '../styles/FavRecipes.css';

function FavoritesRecipes() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [indexNumber, setIndexNumber] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      setFavoriteList(favorites);
    }
  }, []);

  const shareRecipe = (recipe, index) => {
    // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopied(true);
    setIndexNumber(index);
  };

  const unfavoriteRecipe = (indexNum) => {
    const favoritos = favoriteList;
    favoritos.splice(indexNum, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritos));
    const newFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteList(newFav);
  };

  const unfavoriteFilteredRecipe = (id) => {
    const favoritos = favoriteList;
    const filtered = favoritos.find((rcp) => rcp.id === id);
    console.log(filtered);
    for (let i = 0; i < favoritos.length; i += 1) {
      if (favoritos[i] === filtered) {
        favoritos.splice(i, 1);
      }
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritos));
    const newFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteList(newFav);
  };

  return (
    <section className="top-main">
      <Header profile name="Receitas Favoritas" />
      <section className="menu">
        <button
          type="button"
          className="menu-btn btn btn-danger"
          data-testid="filter-by-all-btn"
          onClick={ () => setCategory('all') }
        >
          All
        </button>
        <button
          type="button"
          className="menu-btn btn btn-danger"
          data-testid="filter-by-food-btn"
          onClick={ () => setCategory('comida') }
        >
          Food
        </button>
        <button
          type="button"
          className="menu-btn btn btn-danger"
          data-testid="filter-by-drink-btn"
          onClick={ () => setCategory('bebida') }

        >
          Drinks
        </button>
      </section>
      <Favorited
        favoriteList={ favoriteList }
        copied={ copied }
        setCopied={ setCopied }
        indexNumber={ indexNumber }
        category={ category }
        shareRecipe={ shareRecipe }
        unfavoriteRecipe={ unfavoriteRecipe }
        unfavoriteFilteredRecipe={ unfavoriteFilteredRecipe }
      />
    </section>
  );
}

export default FavoritesRecipes;
