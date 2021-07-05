import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function FinishedRecipes() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const doneRecipes = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    setDoneRecipesList(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const shareRecipe = (recipe) => {
    // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopied(true);
  };

  return (
    <>
      <Header profile name="Receitas Feitas" />
      <section>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <main>
        {doneRecipesList.map((doneRecipe, index) => (
          <div key={ index }>
            <img
              src={ doneRecipe.image }
              alt="recipe"
              data-testid={ `${index}-horizontal-image` }
              width="150px"
            />
            <h6 data-testid={ `${index}-horizontal-top-text` }>
              {doneRecipe.area}
              {doneRecipe.alcoholicOrNot}
              {' - '}
              {doneRecipe.category}
            </h6>
            <h4 data-testid={ `${index}-horizontal-name` }>{doneRecipe.name}</h4>
            <p data-testid={ `${index}-horizontal-done-date` }>{doneRecipe.doneDate}</p>
            {doneRecipe.tags.map((tag) => (
              <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
                {' '}
              </span>
            ))}
            <button type="button" onClick={ () => shareRecipe(doneRecipe) }>
              <img
                src={ shareIcon }
                alt="share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {copied && <span id="spn">Link copiado!</span>}
            {}
          </div>
        ))}
      </main>
    </>
  );
}

export default FinishedRecipes;
