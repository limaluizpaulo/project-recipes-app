import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CategoryCard(props) {
  const { name } = props;

  return (
    <section>
      <Button data-testid={ `${name}-category-filter` }>{name}</Button>
    </section>
  );
}

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CategoryCard;
