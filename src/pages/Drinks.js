import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import fetchAPI from '../services/apiRequest';

const TWELVE = 12;
export default function Drinks() {
  const { path } = useRouteMatch();
  const searchId = path === '/comidas' ? 'idMeal' : 'idDrink';
  const firstKey = path.includes('/comidas') ? 'meals' : 'drinks';
  const domain = path.includes('/comidas') ? 'themealdb' : 'thecocktaildb';

  const { searchResult } = useContext(RecipesContext);
  const [isLoading, setLoader] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [renderer, setRenderer] = useState([]);
  const [limit, setLimit] = useState(TWELVE);

  useEffect(() => {
    async function getInitialStatePopulated() {
      setLoader(true);
      const URL = `https://www.${domain}.com/api/json/v1/1/search.php?s=`;
      const resolved = await fetchAPI(URL);
      setDataResult(resolved[firstKey]);
    }
    getInitialStatePopulated();
    setRenderer(dataResult.filter((_e, index) => index < limit));
    setLoader(false);
    if (searchResult && searchResult.length > 1) {
      setLoader(true);
      setRenderer(searchResult.filter((_e, index) => index < limit));
      setLoader(false);
    }
  }, [limit, firstKey, dataResult, searchResult, domain]);

  function handleMoreCards() {
    setLimit(limit + TWELVE);
  }

  return (
    <>
      <Header />
      {isLoading
        ? <p>Loading...</p>
        : renderer.map((item, i) => (
          <Link key={ item[searchId] } to={ `${path}/${item[searchId]}` }>
            <Card mealOrDrink={ item } index={ i } />
          </Link>))}
      <button type="button" onClick={ handleMoreCards }>More Recipes</button>
      <Footer />
    </>
  );
}
