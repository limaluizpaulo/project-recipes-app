import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import { getRandomData,
  getCategoriesList,
  getDataByCategory,
  getDataIngredients,
} from '../services/apiRequest';

const TWELVE = 12;
const FIVE = 5;
export default function MainPage() {
  const { path } = useRouteMatch();

  const [searchId, firstKey, domain] = path.includes('comidas')
    ? ['idMeal', 'meals', 'themealdb']
    : ['idDrink', 'drinks', 'thecocktaildb'];

  const {
    searchResult,
    limit,
    setLimit,
    ingredientsResults,
  } = useContext(RecipesContext);

  const [dataResult, setDataResult] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [renderer, setRenderer] = useState([]);
  const [toggle, setToggle] = useState({ status: false, category: '' });

  useEffect(() => {
    if (ingredientsResults.length === 0) {
      getRandomData(domain)
        .then((res) => {
          setDataResult(res[firstKey]);
          setRenderer(res[firstKey].filter((_e, index) => index < limit));
        });
    }

    getCategoriesList(domain)
      .then((res) => {
        setCategoriesList(res[firstKey].filter((_e, index) => index < FIVE));
      });
  }, [limit, firstKey, domain, ingredientsResults]);

  useEffect(() => {
    if (searchResult && searchResult.length > 1) {
      setRenderer(searchResult.filter((_e, index) => index < limit));
    }
  }, [searchResult, limit]);

  useEffect(() => {
    if (ingredientsResults.length) {
      getDataIngredients(domain, ingredientsResults).then((res) => {
        setRenderer(res[firstKey].filter((_e, index) => index < limit));
      });
    }
  }, [ingredientsResults, domain, firstKey, limit]);

  async function handleCategoryFilter(category) {
    if (toggle.category === category) {
      setToggle({ status: false, category: '' });
      setRenderer(dataResult.filter((_e, index) => index < limit));
    } else {
      getDataByCategory(domain, category)
        .then((res) => {
          setRenderer(res[firstKey].filter((_e, index) => index < limit));
        });
      setToggle({ status: true, category });
    }
  }

  function handleAllClick() {
    setRenderer(dataResult.filter((_e, index) => index < limit));
  }

  function handleMoreCards() {
    setLimit(limit + TWELVE);
  }

  return (
    <>
      <Header />
      {categoriesList.map((category) => (
        <Button
          data-testid={ `${category.strCategory}-category-filter` }
          key={ category.strCategory }
          onClick={ () => handleCategoryFilter(category.strCategory) }
        >
          {category.strCategory}
        </Button>))}
      <Button data-testid="All-category-filter" onClick={ handleAllClick }>All</Button>
      {renderer.map((item, i) => (
        <Link key={ item[searchId] } to={ `${path}/${item[searchId]}` }>
          <Card mealOrDrink={ item } index={ i } testId="recipe" />
        </Link>))}
      <button type="button" onClick={ handleMoreCards }>More Recipes</button>
      <Footer />
    </>
  );
}
