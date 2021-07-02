import React, { useContext } from 'react';
import { GlobalContext } from '../context/Provider';

const Categories = ({ food }) => {
  const magic = 5;
  const { ctgMeals, ctgDrinks } = useContext(GlobalContext);
  const list = food ? ctgMeals : ctgDrinks;
  list.splice(0, magic);
  return (
    <div>
      { list.map(({ strCategoy }) => (
        <button
          type="button"
          key={ strCategoy }
          data-testid={ `${strCategoy}-category-filter` }
        >
          {strCategoy}
        </button>
      )) }
    </div>
  );
};

Categories.defaultProps = {
  food: false,
};

Categories.propTypes = {
  food: PropTypes.bool,
};

export default Categories;
