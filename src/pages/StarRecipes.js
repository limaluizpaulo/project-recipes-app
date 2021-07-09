import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Context } from '../context/ContextForm';
import Header from '../components/Header';
import Icons from '../components/Icons';
import '../styles/global.css';

function StarRecipes() {
  const favorite = JSON.parse(window.localStorage.getItem('favoriteRecipes'));
  // const [search, setSearch] = useState(favorite);
  const [first, setFirst] = useState(false);
  const { search, setSearch } = useContext(Context);

  if (!first) {
    setSearch(JSON.parse(window.localStorage.getItem('favoriteRecipes')));
    setFirst(true);
  }
  function All() {
    setSearch(favorite);
  }

  function Food() {
    const searchFood = favorite.filter((item) => item.type === 'comida');
    setSearch(searchFood);
  }

  function Drink() {
    const searchDrink = favorite.filter((item) => item.type === 'bebida');
    setSearch(searchDrink);
  }

  if (favorite === null) {
    return (
      <div>
        <Header title="Receitas Favoritas" />
        <div>
          <h4 className="noFavorite">Não há receitas favoritadas</h4>
        </div>
      </div>
    );
  }
  if (favorite) {
    return (
      <div>
        <Header title="Receitas Favoritas" />
        <div>
          <button
            type="button"
            onClick={ () => All() }
            className="category-btn"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            onClick={ () => Food() }
            className="category-btn"
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            type="button"
            onClick={ () => Drink() }
            className="category-btn"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        <div className="favorite-recipes">
          {favorite.length === 0
            ? <h4 className="noFavoriteWithHeader">Não há receitas favoritadas</h4>
            : search.map((recipe, index) => (
              <div key={ recipe.id } className="card-favorite">
                <Link
                  to={ `/${recipe
                    .type === 'comida' ? 'comidas' : 'bebidas'}/${recipe.id}` }
                >
                  <div
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      className="favorite-img"
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.image }
                    />
                    <Card.Body className="favorite-body">

                      <Card.Subtitle data-testid={ `${index}-horizontal-top-text` }>
                        {recipe.type === 'comida'
                          ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot}
                      </Card.Subtitle>
                      <Card.Title
                        className="cardTitle"
                        data-testid={ `${index}-horizontal-name` }
                      >
                        {recipe.name}
                      </Card.Title>

                    </Card.Body>
                  </div>
                </Link>
                <Icons fromHorizontal id={ index } code={ recipe } />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default StarRecipes;
