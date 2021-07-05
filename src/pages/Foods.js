import React, { useContext, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';

export default function Foods() {
  const TWELVE = 12;
  const { globalState } = useContext(RecipesContext);
  const [searchStatus, setSearchStatus] = useState(false);
  const [result, setResult] = useState([]);
  const [limit, setLimit] = useState(TWELVE);

  useEffect(() => {
    if (globalState && globalState.length > 1) {
      setSearchStatus(true);
      setResult(globalState.filter((_e, index) => index < limit));
    }
  }, [globalState, limit]);

  function handleMoreCards() {
    setLimit(limit + TWELVE);
  }

  return (
    <>
      <Header />
      {searchStatus && result.map((item, i) => (
        <Card key={ item.idMeal } mealOrDrink={ item } index={ i } />))}
      {searchStatus && (
        <button type="button" onClick={ handleMoreCards }>More Recipes</button>)}
      <Footer />
    </>
  );
}
