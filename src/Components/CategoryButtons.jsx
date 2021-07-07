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
  const [filter, setFilter] = React.useState('All');
  const toggleCategory = ({ target }) => {
    const category = target.getAttribute('category');
    if (category !== filter) {
      setFilter(category);
    } else {
      setFilter('All');
    }
  };
  React.useEffect(() => {
    async function fetchdata() {
      await listCategory(filter, type);
    }
    fetchdata();
  }, [listCategory, filter, type]);
  return (
    <div className="btn-group categories" role="group">
      <button
        type="button"
        itemType={ type }
        category="All"
        data-testid="All-category-filter"
        className="btn btn-secondary"
        onClick={ (e) => toggleCategory(e) }
      >
        All

      </button>
      {editedCategories.map((category, index) => (
        <button
          key={ index }
          data-testid={ `${category}-category-filter` }
          category={ category }
          itemType={ type }
          type="button"
          className="btn btn-secondary"
          onClick={ (e) => toggleCategory(e) }
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
