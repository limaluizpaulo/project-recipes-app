import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import Header from './Header';
import SBElements from './SBElements';

function FavRecipes({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);

  useEffect(() => {
    setTitle('Receitas Favoritas');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } data-testid="page-title" />
      { goSearch && <SBElements history={ history } /> }
      <h4>Aqui vão ficar as receitas favoritas</h4>
    </div>
  );
}

FavRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default FavRecipes;
