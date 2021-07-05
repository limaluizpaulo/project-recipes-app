import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/Context';
import { apiRequestFoods } from '../services/api/getMealsDrink';
import { apiCategoriesFoods } from '../services/api/getList';
import { requestCategoriesMael } from '../services/api/getCategories';
import RenderMealIngredient from '../components/RenderMealIngredient';
import RenderMeal from '../components/RenderMeal';

// Tela principal de receitas de comidas: /comidas
export default function MainFood({ history }) {
  const {
    previousIsExploreIngredients,
    valueButton,
    setValueButton,
    dataFood,
    setDataFood,
    setfilterFood,
    dataCategoriesFood,
    setDataCategoriesFood,
    filterCategoriesFood,
    setFilterCategoriesFood,
    dataCategories,
    setDataCategories,
    setFilterDataCategories,
    setToogle,
    setAllValue,
    setPreviousIsExploreIngredients,
  } = useContext(RecipeContext);

  useEffect(() => {
    async function apiRequest() {
      const { meals } = await apiRequestFoods();
      setDataFood(meals);
    }
    apiRequest();
    async function apiRequestCategories() {
      const { meals } = await apiCategoriesFoods();
      setDataCategoriesFood(meals);
    }
    apiRequestCategories();

    return () => {
      setPreviousIsExploreIngredients(false);
    };
  }, []);

  // useEffect(() => {
  //   async function apiRequestCategories() {
  //     const { meals } = await apiCategoriesFoods();
  //     setDataCategoriesFood(meals);
  //   }
  //   apiRequestCategories();
  // }, []);

  useEffect(() => {
    async function categories() {
      if (valueButton !== '') {
        const { meals } = await requestCategoriesMael(valueButton) || [];
        setDataCategories(meals);
      }
    }
    categories();
  }, [valueButton]);

  useEffect(() => {
    const NUMBER_FILTER = 12;
    const NUMBER_FILTER_CATEGORIES = 5;
    setfilterFood(dataFood.slice(0, NUMBER_FILTER));
    setFilterCategoriesFood(dataCategoriesFood.slice(0, NUMBER_FILTER_CATEGORIES));
    setFilterDataCategories(dataCategories.slice(0, NUMBER_FILTER));
  }, [dataFood, dataCategoriesFood, dataCategories]);

  function handleOnClick({ target }) {
    setValueButton(target.value);
    setAllValue('');
    if (target.value !== valueButton) {
      setToogle(true);
    }
    if (target.value === valueButton) {
      setToogle(false);
      setValueButton('');
    }
  }

  async function handleAllOnclick({ target }) {
    setAllValue(target.value);
    setValueButton('');
    setToogle(false);
  }

  function buttonCategories() {
    return filterCategoriesFood.map((categ, i) => (
      <button
        type="button"
        key={ i }
        value={ categ.strCategory }
        data-testid={ `${categ.strCategory}-category-filter` }
        onClick={ handleOnClick }
      >
        {categ.strCategory}
      </button>
    ));
  }

  return (
    <div>
      <h4>Meals</h4>
      <Header history={ history } title="Comidas" />
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          value="All"
          onClick={ handleAllOnclick }
        >
          All
        </button>
        {buttonCategories()}
      </div>
      {previousIsExploreIngredients ? <RenderMealIngredient /> : <RenderMeal /> }
      <Footer />
    </div>
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
