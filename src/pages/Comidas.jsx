import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardsDeReceitas from '../components/CardsDeReceitas';
import AppReceitasContext from '../context/AppReceitasContext';

const MAX = 12;

function Comidas() {
  const { fetchAPI } = useContext(AppReceitasContext);
  const { meals } = fetchAPI;
  const notFoundRecipeAlert = (functionAlert) => {
    functionAlert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };
  console.log(meals);
  return (
    <section>
      <Container>
        <Header />
        {meals !== undefined && ((meals === null) ? notFoundRecipeAlert(alert)
          : <CardsDeReceitas receitas={ meals.slice(0, MAX) } />)}
        <Footer />
      </Container>
    </section>
  );
}

export default Comidas;
