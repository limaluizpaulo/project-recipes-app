import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useLocation, Link } from 'react-router-dom';
import { buscaReceita, receitasApi } from '../services/servicesApi';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Titulo from './detailsElements/Titulo';
import IngredientsList from './detailsElements/IngredientsList';
import Carousel from './detailsElements/Carousel';

function DetailsReceita(props) {
  const { match: { params: { id } } } = props;
  const rotaAtual = useLocation().pathname;
  const [apelidoAPI] = rotaAtual.match(/\w+/);
  const [receitas] = useState({ apelidoAPI, input: id });
  const [receita, setReceita] = useState({});
  const [sugestoes, setSugestoes] = useState({});
  const ingredientes = [];

  useEffect(() => {
    const didMount = async () => {
      const respostaApi = await buscaReceita(receitas);
      setReceita(respostaApi);
    };
    const sugestoesfunv = async () => {
      let apelido = 'comidas';
      if (apelidoAPI === 'comidas') {
        apelido = 'bebidas';
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

  function videoRender() {
    if (apelidoAPI === 'comidas') {
      return (
        <iframe
          data-testid="video"
          title={ receita.strArea }
          src={ receita.strYoutube }
        />
      );
    }
  }

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

      <p data-testid="instructions">{receita.strInstructions}</p>
      {videoRender()}

      <Link to="/">
        <img data-testid="favorite-btn" src={ blackHeartIcon } alt="" />
      </Link>
      <Link to="/">
        <img data-testid="share-btn" src={ shareIcon } alt="" />
      </Link>
      <Link data-testid="start-recipe-btn" to={ `/${apelidoAPI}/${id}/in-progress` }>
        iniciar receita
      </Link>
      <Carousel sugest={ [sugestoes, type] } />
      <div data-testid={ `${0}-recomendation-card` }>receitas recomendadas</div>
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
