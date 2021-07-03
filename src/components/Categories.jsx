import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../helpers/Button';
import RecipesContext from '../contexts/RecipesContext';

export default function Categories(props) {
  const { data } = props;
  const {
    selectedCategory,
    setSelectedCategory,
    setToggle,
    toggle,
  } = useContext(RecipesContext);

  const filter = (strCategory) => {
    if (!toggle) {
      setToggle(true);
      setSelectedCategory(strCategory);
    } else if (toggle && strCategory !== selectedCategory) {
      setSelectedCategory(strCategory);
    } else {
      setToggle(false);
      setSelectedCategory('All');
    }
  };

  return (
    <aside>
      <Button
        key="All"
        label="All"
        func={ () => filter('All') }
        testid="All-category-filter"
        className=""
        disabled={ false }
      />
      {data.map(({ strCategory }) => (
        <Button
          key={ strCategory }
          label={ strCategory }
          func={ () => filter(strCategory) }
          testid={ `${strCategory}-category-filter` }
          className=""
          disabled={ false }
        />
      ))}
    </aside>
  );
}

Categories.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
