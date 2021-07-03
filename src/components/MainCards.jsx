import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Categories from './Categories';

export default function MainCards(props) {
  const {
    data,
    thumbnail,
    title,
    categories,
    typeId,
  } = props;

  return (
    <main>
      <Categories data={ categories } />
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
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  typeId: PropTypes.string.isRequired,
};
