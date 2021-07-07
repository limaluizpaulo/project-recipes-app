import React from 'react';

function FilterButtons({ initialFavorites, filterFavorites, setFilterFavorites }) {
  const filtrando = (filter) => {
    if (filter === 'All') {
      setFilterFavorites(initialFavorites);
    } else if (filter === 'Food') {
      setFilterFavorites(['initialFavorites', 0]);
    } else {
      setFilterFavorites(['initialFavorites', 1]);
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

export default FilterButtons;
