/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';

function ExploreFoodsIngredients() {
  const { getFiltersList, filterList } = useContext(Context);
  useEffect(() => {
    getFiltersList('https://www.themealdb.com/api/json/v1/1/list.php?i=');
  }, []);
  const maxItems = 12;
  return (
    <>
      <div>Tela de explorar comidas ingredientes</div>
      <Header title="Explorar Ingredientes" />
      <Container>
        <Row>
          {filterList.meals && filterList[Object.keys(filterList)[0]].slice(0, maxItems)
            .map(({
              strIngredient,
            }, index) => IngredientCard(strIngredient, 'meal', index))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
