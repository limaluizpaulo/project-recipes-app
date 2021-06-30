import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
  const { data } = props;
  // console.log(thumbnail);
  return (
    <div>
      <img src={ data.strMealThumb } alt="thumbnail" />
      <span>{data.strMeal}</span>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
