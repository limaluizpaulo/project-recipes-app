import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

import '../styles/DoneRecipes.css';
import '../styles/FavRecipes.css';

function FinishedRecipes() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [indexNumber, setIndexNumber] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // código abaixo apenas para teste pois o requisito que salva no localstorage as receitas ainda nao está pronto
    // const doneRecipes = [
    //   {
    //     id: '52771',
    //     type: 'comida',
    //     area: 'Italian',
    //     category: 'Vegetarian',
    //     alcoholicOrNot: '',
    //     name: 'Spicy Arrabiata Penne',
    //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    //     doneDate: '23/06/2020',
    //     tags: ['Pasta', 'Curry'],
    //   },
    //   {
    //     id: '178319',
    //     type: 'bebida',
    //     area: '',
    //     category: 'Cocktail',
    //     alcoholicOrNot: 'Alcoholic',
    //     name: 'Aquamarine',
    //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    //     doneDate: '23/06/2020',
    //     tags: [],
    //   },
    // ];
    // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      setDoneRecipesList(doneRecipes);
    }
  }, []);

  const shareRecipe = (recipe, index) => {
    // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopied(true);
    setIndexNumber(index);
  };

  const renderAllRecipes = () => (
    <main className="maincards top-main">
      { doneRecipesList
      && doneRecipesList.map((doneRecipe, index) => (
        <div key={ index } className="generic-card">
          <Link to={ `${doneRecipe.type}s/${doneRecipe.id}` }>
            <img
              src={ doneRecipe.image }
              alt="recipe"
              data-testid={ `${index}-horizontal-image` }
              width="150px"
            />
            <h4
              className="card-name"
              data-testid={ `${index}-horizontal-name` }
            >
              {doneRecipe.name}
            </h4>
          </Link>
          <h6 data-testid={ `${index}-horizontal-top-text` }>
            {doneRecipe.area}
            {doneRecipe.alcoholicOrNot}
            {' - '}
            {doneRecipe.category}
          </h6>
          <p data-testid={ `${index}-horizontal-done-date` }>{doneRecipe.doneDate}</p>
          {doneRecipe.tags.map((tag) => (
            <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
              {' '}
            </span>
          ))}
          <button type="button" onClick={ () => shareRecipe(doneRecipe, index) }>
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
    <main className="maincards top-main">
      {doneRecipesList
      && doneRecipesList.filter((recipe) => recipe.type === category)
        .map((doneRecipe, index) => (
          <div key={ index } className="generic-card">
            <Link to={ `${doneRecipe.type}s/${doneRecipe.id}` }>
              <img
                src={ doneRecipe.image }
                alt="recipe"
                data-testid={ `${index}-horizontal-image` }
                width="150px"
              />
              <h4
                className="card-name"
                data-testid={ `${index}-horizontal-name` }
              >
                {doneRecipe.name}
              </h4>
            </Link>
            <h6 data-testid={ `${index}-horizontal-top-text` }>
              {doneRecipe.area}
              {doneRecipe.alcoholicOrNot}
              {' - '}
              {doneRecipe.category}
            </h6>
            <p data-testid={ `${index}-horizontal-done-date` }>{doneRecipe.doneDate}</p>
            {doneRecipe.tags.map((tag) => (
              <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
                {' '}
              </span>
            ))}
            <button type="button" onClick={ () => shareRecipe(doneRecipe, index) }>
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
    <section className="top-main">
      <Header profile name="Receitas Feitas" />
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
      {category === 'all' ? renderAllRecipes() : renderByCategory()}
    </section>
  );
}

export default FinishedRecipes;
