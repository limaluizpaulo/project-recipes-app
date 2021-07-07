import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import '../styles/categories.css';

export default function CategoryButton(props) {
  const { value } = props;

  return (
    <Button
      bsPrefix="btn"
      data-testid={ `${value}-category-filter` }
    >
      { value }
    </Button>
  );
}

CategoryButton.propTypes = {
  value: PropTypes.string,
}.isRequired;
