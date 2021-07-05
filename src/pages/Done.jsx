import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Header, Filters } from '../components';
import shareIcon from '../images/shareIcon.svg';
import { getFromLocalStorage } from '../services/helpers/localStorage';

const Done = () => {
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('');
  const doneRecipes = getFromLocalStorage('doneRecipes') || [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image:
        'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
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
      image:
        'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  return (
    <>
      <Header name="Receitas Feitas" />

      <Filters clickFilter={ setFilter } />

      <div className="done-recipes">
        {copied ? 'Link copiado!' : ''}

        {doneRecipes.length > 0
          && doneRecipes
            .filter(({ type }) => type.includes(filter))
            .map(
              (
                {
                  image,
                  category,
                  name,
                  area,
                  tags,
                  doneDate,
                  alcoholicOrNot,
                  id,
                  type,
                },
                index,
              ) => (
                <div key={ index }>
                  <Link to={ `/${type}s/${id}` }>
                    <img
                      src={ image }
                      width="200px"
                      alt=""
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  <div>
                    <span data-testid={ `${index}-horizontal-top-text` }>
                      {alcoholicOrNot || `${area} - ${category}`}
                    </span>
                    <button
                      type="button"
                      onClick={ () => {
                        clipboardCopy(`http://localhost:3000/${type}s/${id}`);
                        setCopied(true);
                      } }
                    >
                      <img
                        src={ shareIcon }
                        alt=""
                        data-testid={ `${index}-horizontal-share-btn` }
                      />
                    </button>
                    <Link to={ `/${type}s/${id}` }>
                      <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
                    </Link>
                    <h4 data-testid={ `${index}-horizontal-done-date` }>
                      {doneDate}
                    </h4>
                    {tags.map((tag, tagIndex) => (tagIndex <= 1 ? (
                      <span
                        key={ tagIndex }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </span>
                    ) : null))}
                  </div>
                </div>
              ),
            )}
      </div>
    </>
  );
};

export default Done;
