import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Categories, Card, Footer, SearchBar } from '../components';
import { MealsContext } from '../context/MealsProvider';

const Meals = () => {
  const [redirect, setRedirect] = useState(false);
  const {
    meals,
    categories,
    selectedCategory,
    setFilterCategory,
  } = useContext(MealsContext);

  useEffect(() => {
    if (meals.length === 1 && !redirect && selectedCategory === 'All') {
      setRedirect(true);
    }
  }, [meals]);

  if (redirect) return <Redirect to={ `comidas/${meals[0].idMeal}` } />;
  return (
    <div>

      <Header name="Comidas" search>
        <SearchBar db="meals" />
      </Header>

      <Categories
        categories={ categories }
        onClick={ setFilterCategory }
      />
      {meals.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <Card
          id={ idMeal }
          key={ idMeal }
          title={ strMeal }
          img={ strMealThumb }
          index={ index }
          type="comidas"
        />
      ))}
      <Footer />
    </div>
  );
};

export default Meals;
