import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default function MainCards(props) {
  const { data, thumbnail, title } = props;

  return (
    <main>
      <aside>Categories</aside>
      <section>
        {data.length
          && data.map((recipe, index) => (
            <Card
              key={ index }
              id={ index }
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
};
