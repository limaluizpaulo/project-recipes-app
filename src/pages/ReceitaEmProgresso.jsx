import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { buscaReceita } from '../services/servicesApi';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

function ReceitaEmProgresso(props) {
  const { match: { params: { id } } } = props;
  const rotaAtual = useLocation().pathname;
  const [apelidoAPI] = rotaAtual.match(/\w+/);
  const [parametrosBusca] = useState({ apelidoAPI, input: id });
  const [receita, setReceita] = useState({});

  useEffect(() => {
    const didMount = async () => {
      const respostaApi = await buscaReceita(parametrosBusca);
      setReceita(respostaApi);
    };
    didMount();
  }, [parametrosBusca]);

  const renderizaImagemReceita = () => {
    const src = (
      (apelidoAPI === 'comidas') ? receita.strMealThumb : receita.strDrinkThumb);
    const alt = ((apelidoAPI === 'comidas') ? receita.strMeal : receita.strDrink);
    return (
      <img
        data-testid="recipe-photo"
        src={ `${src}` }
        alt={ `${alt}` }
      />
    );
  };

  const renderizaTituloReceitas = () => {
    const titulo = ((apelidoAPI === 'comidas') ? receita.strMeal : receita.strDrink);
    return (
      <h2 data-testid="recipe-title">{titulo}</h2>
    );
  };

  const renderizaBotoesTitulo = () => (
    <>
      <button type="button">
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="share-btn"
        />
      </button>
      <button type="button">
        <img
          data-testid="favorite-btn"
          src={ favoriteIcon }
          alt="favorite-btn"
        />
      </button>
    </>
  );

  const renderizaCategoriaReceita = () => (
    <div data-testid="recipe-category">{receita.strCategory}</div>
  );

  const renderizaIngredientes = () => {
    const ingredientesEMedidas = Object.keys(receita).reduce((acc, key) => {
      if (key.match(/strIngredient\d+/) && receita[key]) {
        acc[0].push(receita[key]);
      }

      if (key.match(/strMeasure\d+/) && receita[key]) {
        acc[1].push(receita[key]);
      }
      return acc;
    }, [[], []]);
    return (
      <>
        {ingredientesEMedidas[0].map((ingrediente, index) => (
          <div key={ ingrediente } className="mb-3">
            <label htmlFor={ ingrediente } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                id={ ingrediente }
                name={ ingrediente }
                value={ ingrediente }
              />
              { `${ingredientesEMedidas[1][index]} ${ingrediente}` }
            </label>
          </div>
        ))}
      </>
    );
  };

  const renderizaInstrucoes = () => (
    <div data-testid="instructions">{receita.strInstructions}</div>
  );

  const renderizaBotaoFinalizar = () => (
    <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
  );

  return (
    <>
      { renderizaImagemReceita() }
      { renderizaTituloReceitas() }
      { renderizaBotoesTitulo() }
      { renderizaCategoriaReceita() }
      { renderizaIngredientes() }
      { renderizaInstrucoes() }
      { renderizaBotaoFinalizar() }
    </>
  );
}

ReceitaEmProgresso.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ReceitaEmProgresso;
