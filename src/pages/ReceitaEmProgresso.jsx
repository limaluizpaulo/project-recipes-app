import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { buscaReceita } from '../services/servicesApi';
import shareIcon from '../images/shareIcon.svg';
import Ingredientes from '../components/ReceitaEmProgresso/Ingredientes';
import BotaoFavorito from '../components/ReceitaEmProgresso/BotaoFavorito';
import formatIngredientsAndMeasuresArray from '../helpers/formatIngredientsMeasures';

function ReceitaEmProgresso() {
  const rotaAtual = useLocation().pathname;
  const { id } = useParams();
  const [apelidoAPI] = rotaAtual.match(/\w+/);
  const [parametrosBusca] = useState({ apelidoAPI, input: id });
  const [receita, setReceita] = useState({
    id: '',
    type: '',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    tags: [],
    instructions: '',
  });
  const [ingredientesCheckboxes, setIngredientesCheckboxes] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const didMount = async () => {
      const respostaApi = await buscaReceita(parametrosBusca);

      const type = apelidoAPI.replace('s', '');
      const category = respostaApi.strCategory;
      const instructions = respostaApi.strInstructions;
      const area = respostaApi.strArea ? respostaApi.strArea : '';
      const alcoholicOrNot = respostaApi.strAlcoholic ? respostaApi.strAlcoholic : '';
      const tags = respostaApi.strTags ? respostaApi.strTags.split(',') : [];
      const name = apelidoAPI === 'comidas' ? respostaApi.strMeal : respostaApi.strDrink;
      const image = apelidoAPI === 'comidas'
        ? respostaApi.strMealThumb : respostaApi.strDrinkThumb;

      setReceita({
        id,
        type,
        area,
        category,
        alcoholicOrNot,
        name,
        image,
        tags,
        instructions,
      });

      const ingredientsAndMeasures = formatIngredientsAndMeasuresArray(respostaApi);
      setIngredientesCheckboxes(ingredientsAndMeasures);
    };
    didMount();
  }, []);

  const renderizaImagemReceita = () => {
    const { image, name } = receita;
    return (
      <img
        data-testid="recipe-photo"
        src={ image }
        alt={ name }
      />
    );
  };

  const renderizaTituloReceitas = () => {
    const { name } = receita;
    return (
      <h2 data-testid="recipe-title">{name}</h2>
    );
  };

  const copiarLink = () => {
    const doisSegundos = 2000;
    const tooltip = document.querySelector('.improvised-tooltip');
    tooltip.innerHTML = 'Link copiado!';
    const { URL } = document;
    const [urlFormatado] = URL.match(/.+(?=\/in-progress)/);
    clipboardCopy(urlFormatado);
    const exibirTooltip = setTimeout(() => {
      tooltip.innerHTML = '';
      clearTimeout(exibirTooltip);
    }, doisSegundos);
  };

  const renderizaBotoesTitulo = () => (
    <>
      <div>
        <span className="improvised-tooltip" />
      </div>
      <button type="button" className="button-transparent" onClick={ copiarLink }>
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="share-btn"
        />
      </button>
      <BotaoFavorito
        getFavoriteRecipesParams={ { apelidoAPI, id } }
        receita={ receita }
      />
    </>
  );

  const renderizaCategoriaReceita = () => {
    const { category } = receita;
    return (
      <div data-testid="recipe-category">{category}</div>
    );
  };

  const renderizaInstrucoes = () => {
    const { instructions } = receita;
    return (
      <div data-testid="instructions">{instructions}</div>
    );
  };

  const renderizaBotaoFinalizar = () => (
    <Link to="/receitas-feitas">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !isComplete }
      >
        Finalizar receita
      </button>
    </Link>
  );

  return (
    <>
      { renderizaImagemReceita() }
      { renderizaTituloReceitas() }
      { renderizaBotoesTitulo() }
      { renderizaCategoriaReceita() }
      {ingredientesCheckboxes.length
        && <Ingredientes
          listaIngredientes={ ingredientesCheckboxes }
          getIngredientsParams={ { apelidoAPI, id } }
          setIsComplete={ setIsComplete }
        />}
      { renderizaInstrucoes() }
      { renderizaBotaoFinalizar() }
    </>
  );
}

export default ReceitaEmProgresso;
