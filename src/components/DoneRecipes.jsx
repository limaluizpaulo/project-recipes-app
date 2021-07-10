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
            <Link to={ `/${type}s/${id}` }>

              <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>

            </Link>
            {area === '' ? null : (
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${area} - ${category} `}

              </h4>
            )}
            {alcoholicOrNot === '' ? null : (
              <h4 data-testid={ `${index}-horizontal-top-text` }>
                {alcoholicOrNot}
              </h4>
            )}
            <h5 data-testid={ `${index}-horizontal-top-text` }>{type}</h5>
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
