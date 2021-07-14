import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../context/Provider';

const Categories = ({ food }) => {
  const magic = 5;
  const { ctgMeals, ctgDrinks, setSearchOp, setRecipes } = useContext(GlobalContext);
  const [oldCategory, setOldCategory] = useState('');
  const [toggleActive, setToggle] = useState(false);
  const list = food ? ctgMeals : ctgDrinks;
  const filter = list.slice(0, magic);

  const toggle = (category) => {
    if (!toggleActive || category !== oldCategory) {
      setOldCategory(category);
      setToggle(true);
      setSearchOp({ inputSearch: category, option: 'category', food });
    } else {
      setToggle(false);
      setRecipes({});
    }
  };

  return (
    <nav className="navCategories">
      {filter.map(({ strCategory }) => (
        <button
          className="buttons-cattegory"
          onClick={ () => toggle(strCategory) }
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>
      ))}
      <button
        className="buttons-cattegory"
        onClick={ () => setRecipes({}) }
        type="button"
        data-testid="All-category-filter"
      >
        All
      </button>
    </nav>
  );
};

Categories.defaultProps = {
  food: false,
};

Categories.propTypes = {
  food: PropTypes.bool,
};

export default Categories;
