import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import fetchAPI from '../services/apiRequest';

const TWELVE = 12;
export default function Foods() {
  const { path } = useRouteMatch();
  const searchId = path === '/comidas' ? 'idMeal' : 'idDrink';
  const firstKey = (path === '/bebidas') ? 'drinks' : 'meals';

  const { searchResult } = useContext(RecipesContext);
  const [searchStatus, setSearchStatus] = useState(false);
  const [initialState, setInitialState] = useState([]);
  const [result, setResult] = useState([]);
  const [limit, setLimit] = useState(TWELVE);

  useEffect(() => {
    async function getInitialStatePopulated() {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const resolved = await fetchAPI(URL);
      setInitialState(resolved[firstKey].filter((_e, index) => index < limit));
    }
    getInitialStatePopulated();
  }, [limit, firstKey]);

  useEffect(() => {
    if (searchResult && searchResult.length > 1) {
      setSearchStatus(true);
      setResult(searchResult.filter((_e, index) => index < limit));
    }
  }, [searchResult, limit]);

  function handleMoreCards() {
    setLimit(limit + TWELVE);
  }

  return (
    <>
      <Header />
      {searchStatus
        ? result.map((item, i) => (
          <Link key={ item.idMeal } to={ `${path}/${item[searchId]}` }>
            <Card mealOrDrink={ item } index={ i } />
          </Link>))
        : initialState.map((item, i) => (
          <Link key={ item[searchId] } to={ `${path}/${item[searchId]}` }>
            <Card mealOrDrink={ item } index={ i } />
          </Link>))}
      <button type="button" onClick={ handleMoreCards }>More Recipes</button>
      <Footer />
    </>
  );
}
