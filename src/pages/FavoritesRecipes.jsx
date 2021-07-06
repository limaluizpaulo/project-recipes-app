import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import unfavIcon from '../images/blackHeartIcon.svg';

import '../styles/DoneRecipes.css';

function FavoritesRecipes() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [indexNumber, setIndexNumber] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const favoriteRecipes = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
      {
        id: '151555',
        type: 'comida',
        area: 'blabla',
        category: 'blabla',
        alcoholicOrNot: '',
        name: 'blabla',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '121',
        type: 'bebida',
        area: '',
        category: 'blibli',
        alcoholicOrNot: 'Alcoholic',
        name: 'blibli',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      setFavoriteList(favorites);
    }
  }, []);

  // useEffect(() => {
  //   const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   setFavoriteList(favorites);
  // }, [favoriteList]);

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

  const renderAllRecipes = () => (
    <main>
      {favoriteList.map((favoriteRecipe, index) => (
        <div key={ index } className="card">
          <Link to={ `${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
            <img
              src={ favoriteRecipe.image }
              alt="recipe"
              data-testid={ `${index}-horizontal-image` }
              width="150px"
            />
            <h4 data-testid={ `${index}-horizontal-name` }>{favoriteRecipe.name}</h4>
          </Link>
          <h6 data-testid={ `${index}-horizontal-top-text` }>
            {favoriteRecipe.area}
            {favoriteRecipe.alcoholicOrNot}
            {' - '}
            {favoriteRecipe.category}
          </h6>
          <button type="button" onClick={ () => unfavoriteRecipe(index) }>
            <img
              src={ unfavIcon }
              alt="unfav"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
          <button type="button" onClick={ () => shareRecipe(favoriteRecipe, index) }>
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <span
            id={ index }
            className={ `${copied && indexNumber === index
              ? 'alert-show' : 'alert-hidden'}` }
            onTransitionEnd={ () => setCopied(false) }
          >
            Link copiado!
          </span>
        </div>
      ))}
    </main>);

  const renderByCategory = () => (
    <main>
      {favoriteList.filter((recipe) => recipe.type === category)
        .map((favoriteRecipe, index) => (
          <div key={ index } className="card">
            <Link to={ `${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
              <img
                src={ favoriteRecipe.image }
                alt="recipe"
                data-testid={ `${index}-horizontal-image` }
                width="150px"
              />
              <h4 data-testid={ `${index}-horizontal-name` }>{favoriteRecipe.name}</h4>
            </Link>
            <h6 data-testid={ `${index}-horizontal-top-text` }>
              {favoriteRecipe.area}
              {favoriteRecipe.alcoholicOrNot}
              {' - '}
              {favoriteRecipe.category}
            </h6>
            <button type="button" onClick={ () => unfavoriteRecipe(index) }>
              <img
                src={ unfavIcon }
                alt="unfav"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            <button type="button" onClick={ () => shareRecipe(favoriteRecipe, index) }>
              <img
                src={ shareIcon }
                alt="share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <span
              id={ index }
              className={ `${copied && indexNumber === index
                ? 'alert-show' : 'alert-hidden'}` }
              onTransitionEnd={ () => setCopied(false) }
            >
              Link copiado!
            </span>
          </div>
        ))}
    </main>
  );

  return (
    <>
      <Header profile name="Receitas Favoritas" />
      <section className="menu">
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="filter-by-all-btn"
          onClick={ () => setCategory('all') }
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="filter-by-food-btn"
          onClick={ () => setCategory('comida') }
        >
          Food
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="filter-by-drink-btn"
          onClick={ () => setCategory('bebida') }

        >
          Drinks
        </button>
      </section>
      {category === 'all' ? renderAllRecipes() : renderByCategory()}
    </>
  );
}

export default FavoritesRecipes;
