import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { buscaReceita } from '../services/servicesApi';
import Ingredientes from '../components/ReceitaEmProgresso/Ingredientes';
import BotaoFavorito from '../components/ReceitaEmProgresso/BotaoFavorito';
import formatIngredientsAndMeasuresArray from '../helpers/formatIngredientsMeasures';
import { addDoneRecipes } from '../services/localStorage';
import customDate from '../helpers/Date';
import ButtonCompartilhar from '../components/ButtonCompartilhar';

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

  const renderizaBotoesTitulo = () => (
    <>
      <ButtonCompartilhar
        parametrosURL={ { id, type: apelidoAPI } }
        dataTestId="share-btn"
      />
      <BotaoFavorito receita={ receita } dataTestId="favorite-btn" onClick={ () => {} } />
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

  const handleClick = () => {
    const { type, area, category, alcoholicOrNot, name, image, tags } = receita;
    const doneDate = customDate();
    const doneRecipe = {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
      doneDate,
      tags,
    };
    addDoneRecipes(doneRecipe);
  };

  const renderizaBotaoFinalizar = () => (
    <Link to="/receitas-feitas">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !isComplete }
        onClick={ handleClick }
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
