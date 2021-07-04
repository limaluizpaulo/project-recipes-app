import React, { useContext, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Thumb from '../components/Details/Thumb';
import Title from '../components/Details/Title';
import IngredientsStep from '../components/Details/IngredientsStep';
import Instructions from '../components/Details/Instructions';

export default function ReceitaEmProcesso({ location }) {
  const { currentRecipe, storeCurrentRecipe } = useContext(Context);
  const { id, title, subtitle, instructions, thumb, ingredients } = currentRecipe;

  useEffect(() => {
    storeCurrentRecipe(location.pathname.split('/')[2]);
  }, []);

  return (
    <Container>
      <Thumb title={ title } thumb={ thumb } />
      <Title id={ id } title={ title } subtitle={ subtitle } />
      <IngredientsStep currentRecipe={ currentRecipe } ingredients={ ingredients } />
      <Instructions instructions={ instructions } />
      <Button
        data-testid="finish-recipe-btn"
        variant="warning"
        block
      >
        Finalizar Receita
      </Button>
    </Container>
  );
}

ReceitaEmProcesso.propTypes = {
  location: PropTypes.shape,
}.isRequired;
