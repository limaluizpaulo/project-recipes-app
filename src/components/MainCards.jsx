import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Categories from './Categories';

export default function MainCards(props) {
  const {
    data,
    thumbnail,
    title,
    typeId,
  } = props;

  return (
    <main>
      <Categories />
      <section className="card-list">
        {data
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
