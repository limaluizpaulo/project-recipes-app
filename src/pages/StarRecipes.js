import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import Icons from '../components/Icons';
import '../styles/global.css';

function StarRecipes() {
  const favorite = JSON.parse(window.localStorage.getItem('favoriteRecipes'));
  const [search, setSearch] = useState(favorite);

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

  if (favorite === null || favorite === []) return null;
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
          {search.map((recipe, index) => (
            <Link
              to={ `/${recipe.type === 'comida' ? 'comidas' : 'bebidas'}/${recipe.id}` }
              key={ recipe.id }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className="card-favorite"
              >
                <img
                  className="favorite-img"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.image }
                />
                <Card.Body className="favorite-body">
                  <div>
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
                  </div>
                  <Icons />
                </Card.Body>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default StarRecipes;
