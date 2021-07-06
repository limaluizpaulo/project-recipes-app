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
  const ingredientes = [];

  useEffect(() => {
    const didMount = async () => {
      const respostaApi = await buscaReceita(teste);
      setReceita(respostaApi);
      // console.log(respostaApi);
    };
    didMount();
  }, [teste]);

  useEffect(() => {
    const vinte = 20;
    for (let index = 0; index < vinte; index += 1) {
      const strIngredient = receita[`strIngredient${index}`];
      const strMeasure = receita[`strMeasure${index}`];
      if (strIngredient !== '' && strIngredient !== undefined) {
        ingredientes.push({ strIngredient, strMeasure });
      }
    }
    // console.log(ingredientes);
  }, [receita]);

  return (
    <div data-testid="0-">

      <h2 data-testid="recipe-title">{receita.strArea}</h2>
      <h3 data-testid="recipe-category">{receita.strCategory}</h3>
      <img
        data-testid="recipe-photo"
        src={ receita.strMealThumb }
        alt={ receita.strArea }
      />
      {ingredientes.forEach((item, i) => {
        console.log(item, i, 'ou');
      })}
      <p data-testid="instructions">{receita.strInstructions}</p>
      <iframe title={ receita.strArea } src={ receita.strYoutube } />

      <Link to="/">
        <img data-testid="favorite-btn" src={ blackHeartIcon } alt="" />
      </Link>

      <Link to="/">
        <img data-testid="share-btn" src={ shareIcon } alt="" />
      </Link>

      {/*

Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure";

 */}

      <Link data-testid="start-recipe-btn" to="/">
        iniciar receita
      </Link>
      {/* <spam data-testid="${index}-recomendation-card">receitas recomendadas</spam> */}

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
