import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import pegarComidasOuBebidas from '../services/outroServiceAPI';

export default function ExplorarPorIngredientes() {
  const [ingredientesComida, setIngredientesComida] = useState([]);
  const [ingredientesBebida, setIngredientesBebida] = useState([]);

  const { pathname } = useLocation();
  const pathComida = '/explorar/comidas/ingredientes';
  const type = pathname === pathComida ? 'meals' : 'drink';

  useEffect(() => {
    const fetchIngredientes = async () => {
      const DOZE = 12;
      const todosIngredientes = await pegarComidasOuBebidas(type, 'ingrediente');
      const ingredientesFiltrados = todosIngredientes.slice(0, DOZE);
      setIngredientesComida(ingredientesFiltrados);
      setIngredientesBebida(ingredientesFiltrados);
    };
    fetchIngredientes();
  }, []);

  const imagemIngredienteComida = (imgNome) => `https://www.themealdb.com/images/ingredients/${imgNome}-Small.png`;
  const imagemIngredienteBebida = (imgNome) => `https://www.thecocktaildb.com/images/ingredients/${imgNome}-Small.png`;

  const renderizerIngredientesComida = () => (
    ingredientesComida.map((item, index) => (
      <section key={ index } data-testid={ `${index}-ingredient-card` }>
        <Link to="/comidas">
          <p data-testid={ `${index}-card-name` }>
            {item.strIngredient}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ imagemIngredienteComida(item.strIngredient) }
            alt={ item.strIngredient }
          />
        </Link>
      </section>))
  );

  const renderizerIngredientesBebida = () => (
    ingredientesBebida.map((item, index) => (
      <section key={ index } data-testid={ `${index}-ingredient-card` }>
        <Link to="/bebidas">
          <p data-testid={ `${index}-card-name` }>
            {item.strIngredient1}
          </p>
          <img
            data-testid={ `${index}-card-img` }
            src={ imagemIngredienteBebida(item.strIngredient1) }
            alt={ item.strIngredient1 }
          />
        </Link>
      </section>))
  );

  return (
    <>
      <Header />
      {pathname === pathComida
        ? renderizerIngredientesComida() : renderizerIngredientesBebida()}
      <Footer />
    </>
  );
}
