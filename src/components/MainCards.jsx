import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Categories from './Categories';
import RecipesContext from '../contexts/RecipesContext';

export default function MainCards(props) {
  const { maxCards } = useContext(RecipesContext);
  const {
    data,
    thumbnail,
    title,
    typeId,
  } = props;

  console.log(data);
  console.log('cu2');
  return (
    <main>
      <Categories />
      <section>
        {data
          && data.map((recipe, index) => (index < maxCards
            ? (
              <Card
                key={ recipe[typeId] }
                index={ index }
                id={ recipe[typeId] }
                thumbnail={ recipe[thumbnail] }
                title={ recipe[title] }
              />)
            : null))}
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
