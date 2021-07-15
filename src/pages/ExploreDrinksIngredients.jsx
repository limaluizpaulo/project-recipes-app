/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';

function ExploreDrinksIngredients() {
  const { getFiltersList, filterList, getByIngredients } = useContext(Context);
  const [isRedirect, setIsRedirect] = useState(false);
  useEffect(() => {
    getFiltersList('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=');
  }, []);

  const maxItems = 12;
  const handle = (ingredientName) => {
    getByIngredients('cocktail', ingredientName);
    setIsRedirect(true);
  };

  return isRedirect ? <Redirect to="/bebidas" /> : (
    <>
      <div>Tela de explorar bebidas ingredientes</div>
      <Header title="Explorar Ingredientes" />
      <Container>
        <Row>
          {filterList.drinks && filterList[Object.keys(filterList)[0]].slice(0, maxItems)
            .map(({
              strIngredient1,
            }, index) => IngredientCard(strIngredient1, 'cocktail', index, handle))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ExploreDrinksIngredients;
