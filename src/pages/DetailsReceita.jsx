import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { buscaReceita } from '../services/servicesApi';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DetailsReceita(props) {
  const { match: { params: { id } } } = props;
  const rotaAtual = useLocation().pathname;
  const [apelidoAPI] = rotaAtual.match(/\w+/);
  const [teste] = useState({ apelidoAPI, input: id });
  const [receita, setReceita] = useState({});

  useEffect(() => {
    const didMount = async () => {
      const respostaApi = await buscaReceita(teste);
      setReceita(respostaApi);
      // console.log(respostaApi);
    };
    didMount();
  }, [teste]);

  function ingrFunction() {
    const vinte = 20;
    const ingredientes = [];
    for (let index = 0; index < vinte; index += 1) {
      const strIngredient = receita[`strIngredient${index}`];
      const strMeasure = receita[`strMeasure${index}`];
      if (strIngredient !== '' && strIngredient !== undefined) {
        ingredientes.push({ strIngredient, strMeasure });
      }
    }
    return ingredientes.map((item, i) => (
      <li
        key={ i }
        data-testid={ `${i}-ingredient-name-and-measure` }
      >
        {item.strIngredient}
        {' - '}
        {item.strMeasure}
      </li>));
  }

  return (
    <div data-testid="0-">

      <h2 data-testid="recipe-title">{receita.strArea}</h2>
      <h3 data-testid="recipe-category">{receita.strCategory}</h3>
      <img
        data-testid="recipe-photo"
        src={ receita.strMealThumb }
        alt={ receita.strArea }
      />
      <ul>
        {ingrFunction()}
      </ul>
      <p data-testid="instructions">{receita.strInstructions}</p>
      <iframe title={ receita.strArea } src={ receita.strYoutube } />

      <Link to="/">
        <img data-testid="favorite-btn" src={ blackHeartIcon } alt="" />
      </Link>

      <Link to="/">
        <img data-testid="share-btn" src={ shareIcon } alt="" />
      </Link>

      <Link data-testid="start-recipe-btn" to="/">
        iniciar receita
      </Link>
      <div data-testid={ `${id}-recomendation-card` }>receitas recomendadas</div>

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
