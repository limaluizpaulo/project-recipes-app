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
  const [parametrosBusca, setParametrosBusca] = useState({ apelidoAPI, input: id });
  const [receita, setReceita] = useState({});

  useEffect(() => {
    const didMount = async () => {
      const respostaApi = await buscaReceita(parametrosBusca);
      setReceita(respostaApi);
    };
    didMount();
  }, [parametrosBusca]);

  const renderizaImagemReceita = () => (
    <img
      data-testid="recipe-photo"
      src={ `${receita.strMealThumb}` }
      alt={ `${receita.strMeal}` }
    />
  );

  const renderizaIngredientes = () => {
    // const ingredientes = Object.keys(receita).filter((key) => key.match(/strIngredient/));
    const ingredientes = Object.keys(receita).reduce((newArr, key) => {
      const keyStr = key.match(/strIngredient/);
      return newArr.concat();
    }, []);
    console.log(ingredientes);
  };

  return (
    <>
      { renderizaImagemReceita() }
      <h2 data-testid="recipe-title">{receita.strMeal}</h2>
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
      <div data-testid="recipe-category">{receita.strCategory}</div>
      { renderizaIngredientes() }
      <div data-testid="instructions">{receita.strInstructions}</div>
      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
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
