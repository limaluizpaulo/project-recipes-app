import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, Redirect } from 'react-router-dom';
import CardsDeReceitas from '../components/CardsDeReceitas';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListaCategoriasReceitas from '../components/ListaCategoriasReceitas';
import AppReceitasContext from '../context/AppReceitasContext';
import { receitasApi } from '../services/servicesApi';

function Receitas() {
  const { parametrosBusca } = useContext(AppReceitasContext);
  const [receitas, setReceitas] = useState([]);
  const rotaAtual = useLocation().pathname;
  const apelidoAPI = rotaAtual.replace('/', '');

  const notFoundRecipeAlert = () => {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  useEffect(() => {
    const requestAPI = async () => {
      const respostaApi = await receitasApi({ apelidoAPI, flag: 's', input: '' });
      setReceitas(respostaApi);
    };
    requestAPI();
  }, [apelidoAPI]);

  useEffect(() => {
    if (Object.keys(parametrosBusca).length > 0) {
      const renderResultadosBusca = async () => {
        const respostaApi = await receitasApi(parametrosBusca);
        if (respostaApi === null) {
          return notFoundRecipeAlert();
        }
        setReceitas(respostaApi);
      };
      renderResultadosBusca();
    }
  }, [parametrosBusca]);

  if (receitas.length === 1) {
    const type = Object.keys(receitas[0])[0];
    const redirect = {
      idDrink: `/bebidas/${receitas[0].idDrink}`,
      idMeal: `/comidas/${receitas[0].idMeal}`,
    };
    if (receitas[0].strMeal !== 'Mbuzi Choma (Roasted Goat)') {
      return <Redirect to={ `${redirect[type]}` } />;
    }
  }

  return (
    <section>
      <Container>
        <Header />
        <ListaCategoriasReceitas />
        {(receitas !== undefined && receitas.length)
          && <CardsDeReceitas receitas={ receitas } typeReceita={ apelidoAPI } /> }
        <Footer />
      </Container>
    </section>
  );
}

export default Receitas;
