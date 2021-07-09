import React from 'react';
import PropTypes from 'prop-types';
import RenderButtons from './RenderButtons';

export default function CategoryButton({ clickCategory, foodOrDrink, clickAll, path }) { // Desestruturação de props
  return (
    <RenderButtons
      clickCategory={ clickCategory }
      foodOrDrink={ foodOrDrink }
      clickAll={ clickAll }
      path={ path }
    />
  );
}

CategoryButton.propTypes = {
  clickCategory: PropTypes.func,
  clickAll: PropTypes.func.isRequired,
  foodOrDrink: PropTypes.func,
  path: PropTypes.bool,
};

CategoryButton.defaultProps = {
  clickCategory: undefined,
  foodOrDrink: () => console.log('nothing to do!'),
  path: false,
};
