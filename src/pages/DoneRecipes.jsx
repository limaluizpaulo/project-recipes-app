import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';

export default function DoneRecipes() {
  const [value, setValue] = useState();
  // const [recipes, setRecipes] = useState([]);
  // useEffect(() => {
  //   setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  // }, [recipes]);
  let recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!recipes) recipes = [];
  // if (recipes === null) { return <p>Não há receitas adicionadas </p>; }
  const renderRecipe = () => {
    if (value === 'All') return recipes;
    if (value === 'Food') return recipes.filter((recipe) => recipe.type === 'comida');
    if (value === 'Drinks') return recipes.filter((recipe) => recipe.type === 'bebida');

    return recipes;
  };
  const { pathname } = useHistory().location;
  // const handleClick = ({ target: { value } }) => {
  //   if (value === 'Food') {
  //     setRecipes(recipes.filter((recipe) => recipe.type === 'comida'));
  //   }
  // };
  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="btns-filters">
        <button
          value="All"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setValue('All') }
        >
          All
        </button>
        <button
          value="Food"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setValue('Food') }
        >
          Food
        </button>
        <button
          value="Drinks"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setValue('Drinks') }
        >
          Drinks
        </button>
      </div>
      <div className="recipe-cards" />
      {renderRecipe().map((item, index) => (
        <div key={ item.id }>
          <Link
            to={ item.type === 'comida'
              ? `/comidas/${item.id}` : `/bebidas/${item.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt="avatar"
              className="recipe-card-img"
            />
            <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          </Link>
          {item.type === 'comida' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {item.area}
              {' '}
              -
              {' '}
              {item.category}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {item.alcoholicOrNot}
            </p>
          )}

          <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
          <div className="tags">
            {(item.type === 'comida' ? item.tags.slice(0, 2) : item.tags).map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            ))}
          </div>
          <ShareBtn pathname={ pathname } recipe={ item } index={ index } doneRecipe />
        </div>
      ))}

    </div>
  );
}
