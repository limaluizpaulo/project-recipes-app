import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Filters,
  ShareButton,
  FavoriteButton,
  RecipeHeaderList,
} from '../components';
import { UserContext } from '../context/UserProvider';

const Favorites = () => {
  const { favorites, copied } = useContext(UserContext);
  const [filter, setFilter] = useState('');

  return (
    <div>
      <Header name="Receitas Favoritas" />

      <Filters clickFilter={ setFilter } />

      <div className="done-recipes">
        {copied ? 'Link copiado!' : ''}

        {favorites.length > 0
          && favorites
            .filter(({ type }) => type.includes(filter))
            .map(
              (
                {
                  image,
                  category,
                  name,
                  area,
                  doneDate,
                  alcoholicOrNot,
                  id,
                  type,
                },
                index,
              ) => {
                const header = {
                  index,
                  alcoholicOrNot,
                  area,
                  category,
                  type,
                  id,
                  name,
                };
                return (
                  <div key={ index }>
                    <Link to={ `/${type}s/${id}` }>
                      <img
                        src={ image }
                        width="200px"
                        alt=""
                        data-testid={ `${index}-horizontal-image` }
                      />
                    </Link>
                    <RecipeHeaderList header={ header } />

                    <ShareButton
                      type={ type }
                      id={ id }
                      test={ `${index}-horizontal-share-btn` }
                    />

                    <FavoriteButton
                      id={ id }
                      test={ `${index}-horizontal-favorite-btn` }
                    />

                    <h4 data-testid={ `${index}-horizontal-done-date` }>
                      {doneDate}
                    </h4>
                  </div>
                );
              },
            )}
      </div>
    </div>
  );
};

export default Favorites;
