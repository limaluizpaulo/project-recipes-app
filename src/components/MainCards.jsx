import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
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
  const history = useHistory();
  const { pathname } = useLocation();

  if (data.length === 1) {
    history.push(`${pathname}${data[0][typeId]}`);
    // console.log(data);
  }

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
