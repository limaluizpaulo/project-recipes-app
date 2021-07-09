import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Filters, Tags, ShareButton, RecipeHeaderList } from '../components';
import { UserContext } from '../context/UserProvider';

const Done = () => {
  const { done, copied } = useContext(UserContext);
  const [filter, setFilter] = useState('');

  return (
    <>
      <Header name="Receitas Feitas" />

      <Filters clickFilter={ setFilter } />

      <div className="done-recipes">
        {copied ? 'Link copiado!' : ''}

        {done.length > 0
          && done
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
              ) => {
                const header = { index, alcoholicOrNot, area, category, type, id, name };
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

                    <h4 data-testid={ `${index}-horizontal-done-date` }>
                      {doneDate}
                    </h4>
                    <Tags tags={ tags } recipeIndex={ index } />

                  </div>
                );
              },
            )}
      </div>
    </>
  );
};

export default Done;
