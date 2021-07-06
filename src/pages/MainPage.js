import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import fetchAPI from '../services/apiRequest';

const TWELVE = 12;
const FIVE = 5;
export default function MainPage() {
  const { path } = useRouteMatch();
  const searchId = path === '/comidas' ? 'idMeal' : 'idDrink';
  const firstKey = path.includes('/comidas') ? 'meals' : 'drinks';
  const domain = path.includes('/comidas') ? 'themealdb' : 'thecocktaildb';

  const { searchResult, limit, setLimit } = useContext(RecipesContext);
  const [isLoading, setLoader] = useState(true);
  const [dataResult, setDataResult] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState([]);
  const [renderer, setRenderer] = useState([]);

  const lintChato = searchByCategory
    ? console.log('yayyy... Vamo usar ela depois')
    : console.log('Droga de lint');

  useEffect(() => {
    async function getInitialStatePopulated() {
      const URL = `https://www.${domain}.com/api/json/v1/1/search.php?s=`;
      const resolved = await fetchAPI(URL);
      setDataResult(resolved[firstKey]);
      setRenderer(resolved[firstKey].filter((_e, index) => index < limit));
      setLoader(false);
    }
    getInitialStatePopulated();
    async function getListPopulated() {
      const URL = `https://www.${domain}.com/api/json/v1/1/list.php?c=list`;
      const list = await fetchAPI(URL);
      setCategoriesList(list[firstKey].filter((_e, index) => index < FIVE));
      setLoader(false);
    }

    getListPopulated();
  }, [limit, firstKey, domain]);

  useEffect(() => {
    function renderSearch() {
      setRenderer(searchResult.filter((_e, index) => index < limit));
      setLoader(false);
    }
    if (searchResult && searchResult.length > 1) { renderSearch(); }
  }, [searchResult, limit]);

  function handleMoreCards() {
    setLimit(limit + TWELVE);
  }

  async function handleCategoryFilter(category) {
    const URL = `https://www.${domain}.com/api/json/v1/1/filter.php?c=${category}`;
    const listByCategory = await fetchAPI(URL);
    setSearchByCategory(listByCategory[firstKey]);
    // setRenderer(listByCategory[firstKey].filter((_e, index) => index < limit));
    setRenderer((prevState) => (prevState === listByCategory[firstKey]
      .filter((_e, index) => index < limit)
      ? dataResult.filter((_e, index) => index < limit)
      : listByCategory[firstKey].filter((_e, index) => index < limit)));
    // console.log(dataResult);
    // console.log(searchByCategory);
    // console.log(renderer);
  }

  function handleAllClick() {
    setRenderer(dataResult.filter((_e, index) => index < limit));
  }

  return (
    <>
      {lintChato}
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
      {isLoading
        ? <p>Loading...</p>
        : renderer.map((item, i) => (
          <Link key={ item[searchId] } to={ `${path}/${item[searchId]}` }>
            <Card mealOrDrink={ item } index={ i } testId="recipe" />
          </Link>))}
      <button type="button" onClick={ handleMoreCards }>More Recipes</button>
      <Footer />
    </>
  );
}
