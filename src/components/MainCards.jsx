import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Categories from './Categories';
import RecipesContext from '../contexts/RecipesContext';

export default function MainCards(props) {
  const {
    data,
    thumbnail,
    title,
    typeId,
  } = props;

  const { categoriesData } = useContext(RecipesContext);

  return (
    <main>
      <Categories categories={ categoriesData } />
      <section>
        {data.length
          && data.map((recipe, index) => (
            <Card
              key={ recipe[typeId] }
              index={ index }
              id={ recipe[typeId] }
              thumbnail={ recipe[thumbnail] }
              title={ recipe[title] }
            />
          ))}
      </section>
    </main>
  );
}

MainCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  typeId: PropTypes.string.isRequired,
};
