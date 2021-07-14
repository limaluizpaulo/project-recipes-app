import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import Header from './Header';
import SBElements from './SBElements';

function DoneRecipes({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);

  useEffect(() => {
    setTitle('Receitas Feitas');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } data-testid="page-title" />
      { goSearch && <SBElements history={ history } /> }
      <h4>Aqui vão ficar as receitas feitas</h4>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default DoneRecipes;
