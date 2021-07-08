import React from 'react';
import PropTypes from 'prop-types';

function FilterButtons({ initialFavorites, setFilterFavorites }) {
  const filtrando = (filter) => {
    if (filter === 'All') {
      setFilterFavorites(initialFavorites);
    } else if (filter === 'Food') {
      setFilterFavorites(initialFavorites.filter((aux) => aux.type === 'comida'));
    } else {
      setFilterFavorites(initialFavorites.filter((aux) => aux.type === 'bebida'));
    }
  };

  return (
    <div>
      {/* <p>{ initialFavorites }</p> */}
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="filter-by-all-btn"
            onClick={ () => filtrando('All') }
          >
            All
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="filter-by-food-btn"
            onClick={ () => filtrando('Food') }
          >
            Food
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="filter-by-drink-btn"
            onClick={ () => filtrando('Drinks') }
          >
            Drinks
          </button>
        </div>
        {/* <div>
            <CardRecipesFavorite />
          </div> */}
      </div>
    </div>
  );
}

FilterButtons.propTypes = {
  initialFavorites: PropTypes.objectOf(PropTypes.any).isRequired,
  setFilterFavorites: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FilterButtons;
