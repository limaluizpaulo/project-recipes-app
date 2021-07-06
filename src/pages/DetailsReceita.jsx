import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { buscaReceita } from '../services/servicesApi';

function DetailsReceita(props) {
  const { match: { params: { id } } } = props;
  const rotaAtual = useLocation().pathname;
  const [apelidoAPI] = rotaAtual.match(/\w+/);
  const [teste, setTeste] = useState({ apelidoAPI, input: id });
  const [receita, setReceita] = useState({});

  useEffect(() => {
    const didMount = async () => {
      const respostaApi = await buscaReceita(teste);
      setReceita(respostaApi);
    };
    didMount();
    console.log(receita);
  }, [teste]);

  return (
    <div data-testid="0-">
      {/* {id} */}
      <button type="button" data-testid="start-recipe-btn">
        Go
      </button>
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
