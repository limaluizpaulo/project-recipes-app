/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';

function ExploreFoodsIngredients() {
  const { getFiltersList, filterList, getByIngredients } = useContext(Context);
  const [isRedirect, setIsRedirect] = useState(false);
  useEffect(() => {
    getFiltersList('https://www.themealdb.com/api/json/v1/1/list.php?i=');
  }, []);

  const maxItems = 12;
  const handle = (ingredientName) => {
    getByIngredients('meal', ingredientName);
    setIsRedirect(true);
  };

  return isRedirect ? <Redirect to="/comidas" /> : (
    <>
      <Header title="Explorar Ingredientes" />
      <Container>
        <Row>
          {filterList.meals && filterList[Object.keys(filterList)[0]].slice(0, maxItems)
            .map(({
              strIngredient,
            }, index) => IngredientCard(strIngredient, 'meal', index, handle))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
