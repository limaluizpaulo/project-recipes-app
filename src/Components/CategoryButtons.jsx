import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Buttons.css';

export default function CategoryButtons(props) {
  const { categories } = props;
  const copyCategories = [...categories];
  const five = 5;
  const editedCategories = copyCategories.splice(0, five);
  return (
    <div className="btn-group categories" role="group">
      {editedCategories.map((category, index) => (
        <button
          key={ index }
          data-testid={ `${category}-category-filter` }
          type="button"
          className="btn btn-secondary"
        >
          {category}
        </button>
      ))}

    </div>
  );
}

CategoryButtons.propTypes = PropTypes.shape({}).isRequired;
