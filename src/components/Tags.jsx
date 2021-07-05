import React from 'react';

const Tags = ({ tags, recipeIndex }) => tags.map((tag, tagIndex) => (tagIndex <= 1 ? (
  <span
    key={ tagIndex }
    data-testid={ `${recipeIndex}-${tag}-horizontal-tag` }
  >
    {tag}
  </span>
) : null));

export default Tags;
