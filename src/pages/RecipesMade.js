import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { getDonesRecipes } from '../services/localStorage';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function RecipesMade() {
  const [dones, setDones] = useState();
  const [filter, setFilter] = useState();

  useEffect(() => {
    setDones(getDonesRecipes());
  }, []);

  const renderCards = () => dones
    .filter(({ type }) => type === filter || !filter).map((item, index) => {
      const { id, category, doneDate, name, tags = [], image, area, alcoholicOrNot,
        type } = item;
      return (
        <div className="cardMade" key={ `${index} - ${name}` }>
          <p>{tags}</p>
          <Link to={ `${type}s/${id}` }>
            <button
              // data-testid={ `${index}-horizontal-image` }
              // src={ image }
              alt="Receita"
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                className="recipe-photo"
                src={ image }
                alt={ image }
              />
            </button>
          </Link>
          <div className="containerMade">

            <p data-testid={ `${index}-horizontal-top-text` }>
              {alcoholicOrNot || `${area} - ${category}`}
            </p>
            <Link to={ `${type}s/${id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{name}</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
            <p data-testid={ `${index}-Pasta-horizontal-tag` }>{ tags || tags[0]}</p>
            { tags[1] && <p data-testid={ `${index}-Curry-horizontal-tag` }>{tags[1]}</p>}
            <ShareButton
              url={ `http://localhost:3000/${type}s/${id}` }
              msgShare={
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="shareIcon"
                />
              }
            />
          </div>

        </div>
      );
    });

  return (
    <div className="recipe recipeProgress">
      {/* <button type="button" data-testid="filter-by-all-btn">{}</button> */}
      <Header title="Receitas Feitas" />
      <nav>

        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Drinks
        </button>
      </nav>

      {dones && renderCards()}
    </div>
  );
}

export default RecipesMade;
