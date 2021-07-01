import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default function MainCards(props) {
  const { data } = props;
  // const card = data !== undefined ? data : [];
  console.log(data);
  return (
    <main>
      <aside>Categories</aside>
      <section>
        {data.length && (<Card data={ data[0] } />)}
      </section>
    </main>
  );
}

MainCards.propTypes = {
  // searchBar: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
