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
import { setOnLocalStorage } from '../services/helpers/localStorage';

const Favorites = () => {
  const { favorites } = useContext(UserContext);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('');

  setOnLocalStorage('favoriteRecipes', favorites);

  const favoriteRecipes = favorites;

  return (
    <div>
      <Header name="Receitas Favoritas" />

      <Filters clickFilter={ setFilter } />

      <div className="done-recipes">
        {copied ? 'Link copiado!' : ''}

        {favoriteRecipes.length > 0
          && favoriteRecipes
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
                      changeCopy={ setCopied }
                      index={ index }
                    />

                    <FavoriteButton id={ id } index={ index } />

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
