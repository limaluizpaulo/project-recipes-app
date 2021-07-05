import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategory } from '../redux/actions';
import '../styles/Buttons.css';

function CategoryButtons(props) {
  const { categories, listCategory, type } = props;
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
          onClick={ () => listCategory(category, type) }
        >
          {category}
        </button>
      ))}

    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  listCategory: (category, type) => dispatch(getCategory(category, type)),
});

CategoryButtons.propTypes = PropTypes.shape({}).isRequired;
export default connect(null, mapDispatchToProps)(CategoryButtons);
