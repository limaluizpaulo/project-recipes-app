import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useLocation, Link } from 'react-router-dom';
import { buscaReceita, receitasApi } from '../services/servicesApi';

import Titulo from './detailsElements/Titulo';
import IngredientsList from './detailsElements/IngredientsList';
import CarouselElement from './detailsElements/CarouselElement';
import ButtonCompartilhar from '../components/ButtonCompartilhar';
import BotaoFavorito from '../components/ReceitaEmProgresso/BotaoFavorito';
import { isDone, isInProgress } from '../services/localStorage';

function videoRender(receita, apelidoAPI) {
  const video = receita.strYoutube;
  if (apelidoAPI === 'comidas' && video !== undefined) {
    return (
      <iframe
        data-testid="video"
        title={ receita.strArea }
        src={ video.replace('watch?v=', 'embed/') }
      />
    );
  }
}

function DetailsReceita(props) {
  const { match: { params: { id } } } = props;
  const rotaAtual = useLocation().pathname;
  const [apelidoAPI] = rotaAtual.match(/\w+/);
  const [receitas] = useState({ apelidoAPI, input: id });
  const [receita, setReceita] = useState({});
  const [sugestoes, setSugestoes] = useState({});
  const ingredientes = [];
  // console.log('receita', receita);
  console.log('util', receita.idDrink);
  const [info, setinfo] = useState({});

  useEffect(() => {
    setinfo({
      id: receita.idMeal,
      type: 'comida',
      area: receita.strArea,
      category: receita.strCategory,
      alcoholicOrNot: receita.strAlcoholic,
      name: receita.strMeal,
      image: receita.strMealThumb,
      tags: receita.strTags,
      instructions: receita.strInstructions,
    });
    if (apelidoAPI === 'bebidas') {
      setinfo({
        ...info,
        id: receita.idDrink,
        image: receita.strDrinkThumb,
        type: 'bebida',
        name: receita.strDrink,
      });
    }
  }, [receita]);

  useEffect(() => {
    const didMount = async () => {
      const respostaApi = await buscaReceita(receitas);
      setReceita(respostaApi);
    };

    const sugestoesfunv = async () => {
      let apelido = 'comidas';
      if (apelidoAPI === 'comidas') {
        apelido = 'bebidas';
        setinfo({
          ...info,
          id: receita.idDrink,
          image: receita.strDrinkThumb,
          type: 'bebida',
          name: receita.strDrink,
        });
      }
      const respostaApi2 = await receitasApi({
        apelidoAPI: apelido,
        flag: 's',
        input: '' });
      const six = 6;
      setSugestoes(respostaApi2.slice(0, six));
    };
    didMount();
    sugestoesfunv();
  }, [receitas, apelidoAPI]);

  function ingrFunction() {
    const vinte = 20;
    for (let index = 0; index < vinte; index += 1) {
      const strIngredient = receita[`strIngredient${index}`];
      const strMeasure = receita[`strMeasure${index}`];
      if (strIngredient !== '' && strIngredient !== undefined && strIngredient !== null) {
        ingredientes.push({ strIngredient, strMeasure });
      }
    }
    return <h4>Ingredientes</h4>;
  }

  const botaoIniciarReceita = () => {
    const itsDone = isDone(id);
    const inProgress = isInProgress(apelidoAPI, id);
    return !itsDone && (
      <Link to={ `/${apelidoAPI}/${id}/in-progress` }>
        <button
          type="button"
          className="iniciarbtn footer"
          data-testid="start-recipe-btn"
        >
          { inProgress ? 'Continuar Receita' : 'iniciar receita' }
        </button>
      </Link>
    );
  };

  let type = ['Meal', 'Category', 'Area', 'Drink'];
  if (apelidoAPI === 'bebidas') {
    type = ['Drink', 'Alcoholic', 'Category', 'Meal'];
  }

  return (
    <div data-testid="0-">
      <Titulo type={ [receita, type] } />
      <ul>
        {ingrFunction()}
        {ingredientes.map((ing, i) => <IngredientsList key={ i } ingr={ [ing, i] } />)}
      </ul>
      <div className="preparo">
        <p>- Instruçoes de preparo</p>
        <p data-testid="instructions">{receita.strInstructions}</p>
        {videoRender(receita, apelidoAPI)}
      </div>

      <CarouselElement sugest={ [sugestoes, type] } />

      { botaoIniciarReceita() }

      <div className="salvarcompartilhar">

        <BotaoFavorito receita={ info } dataTestId="favorite-btn" onClick={ () => {} } />
        {console.log(info)}
        <ButtonCompartilhar
          parametrosURL={ { id, type: apelidoAPI } }
          dataTestId="share-btn"
        />
      </div>

    </div>
  );
}

DetailsReceita.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailsReceita;
