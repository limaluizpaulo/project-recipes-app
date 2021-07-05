import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';

export default function Foods() {
  const { path } = useRouteMatch();
  const searchId = path === '/comidas' ? 'idMeal' : 'idDrink';

  const TWELVE = 12;
  const { searchResult } = useContext(RecipesContext);
  const [searchStatus, setSearchStatus] = useState(false);
  const [result, setResult] = useState([]);
  const [limit, setLimit] = useState(TWELVE);

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
      {searchStatus && result.map((item, i) => (
        <Link key={ item.idMeal } to={ `${path}/${item[searchId]}` }>
          <Card mealOrDrink={ item } index={ i } />
        </Link>))}
      {searchStatus && (
        <button type="button" onClick={ handleMoreCards }>More Recipes</button>)}
      <Footer />
    </>
  );
}
