import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import RecipesContext from '../Context/RecipesContext';
import ShareButtonPerfil from './ShareButtonPerfil';

export default function DoneRecipes() {
  const { favoriteFilters } = useContext(RecipesContext);
  console.log(favoriteFilters);

  return (
    <main>
      {favoriteFilters.map(
        (
          {
            image,
            category,
            name,
            id,
            doneDate,
            type,
            tags,
            area,
            alcoholicOrNot,
          },
          index,
        ) => (
          <div key={ id }>
            <Link to={ `/${type}s/${id}` }>
              <img
                src={ image }
                alt="xxxx"
                data-testid={ `${index}-horizontal-image` }
                width="50px"
              />
            </Link>
            {area === '' ? null : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${area} - ${category} `}

              </p>
            )}
            {alcoholicOrNot === '' ? null : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {alcoholicOrNot}
              </p>
            )}
            <Link to={ `/${type}s/${id}` }>

              <p data-testid={ `${index}-horizontal-name` }>{name}</p>

            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>{type}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
            <ShareButtonPerfil id={ id } type={ type } index={ index } />
            <div>
              {tags[0] === null ? (
                <p />
              ) : (
                tags.map((tag, i) => (
                  <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
                    {tag}
                  </p>
                ))
              )}
            </div>
          </div>
        ),
      )}
    </main>
  );
}
