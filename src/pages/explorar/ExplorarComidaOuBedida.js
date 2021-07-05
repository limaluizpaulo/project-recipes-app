import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// a rota deve mudar para a tela de detalhes de uma receita,
// que deve ser escolhida de forma aleatória através da API
// endpoint comida https://www.themealdb.com/api/json/v1/1/random.php
// endpoint bebidas https://www.thecocktaildb.com/api/json/v1/1/random.php

function ExplorarComidaOuBebida() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const isDrinks = pathname.includes('bebidas');
  const title = isDrinks ? 'Bebidas' : 'Comidas';
  const path = isDrinks ? 'bebidas' : 'comidas';

  return (
    <div>
      <Header title={ `Explorar ${title}` } showSearchIcon={ false } />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push(`/explorar/${path}/ingredientes`) }
        >
          Por Ingredientes
        </button>
        { isDrinks
          ? null
          : <button
              type="button"
              data-testid="explore-by-area"
              onClick={ () => history.push(`/explorar/${path}/area`) }
          >
            Por Local de Origem
            </button>
      }
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidaOuBebida;
