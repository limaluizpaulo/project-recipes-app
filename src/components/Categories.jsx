import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../helpers/Button';
import RecipesContext from '../contexts/RecipesContext';
import {
  getMealsRecipes,
  getMealsByCategory,
} from '../helpers/MealsAPI';
import {
  getCocktailsRecipes,
  getCocktailsByCategory,
} from '../helpers/CocktailsAPI';

export default function Categories(props) {
  const { data } = props;

  const maxCards = 12;

  const {
    selectedCategory,
    setData,
    setSelectedCategory,
    setToggle,
    toggle,
    type,
    setIsFetching,
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

  useEffect(() => {
    const filterCategory = async () => {
      setIsFetching(true);
      let results;
      if (selectedCategory === 'All') {
        results = (type === 'meal')
          ? await getMealsRecipes() : await getCocktailsRecipes();
      } else {
        results = (type === 'meal') ? await getMealsByCategory(selectedCategory)
          : await getCocktailsByCategory(selectedCategory);
      }
      if (results && selectedCategory) {
        setData(results.filter((item, index) => index < maxCards));
      }
      setIsFetching(false);
    };
    filterCategory();
  }, [selectedCategory, toggle]);

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
