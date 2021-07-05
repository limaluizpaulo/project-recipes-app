import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Thumb from '../components/Details/Thumb';
import Title from '../components/Details/Title';
import Ingredients from '../components/Details/Ingredients';
import Instructions from '../components/Details/Instructions';
import Video from '../components/Details/Video';

export default function DetalhesComida({ location }) {
  const { currentRecipe, storeCurrentRecipe } = useContext(Context);
  const { id, title, subtitle, instructions, thumb, video, ingredients } = currentRecipe;
  const history = useHistory();

  useEffect(() => {
    storeCurrentRecipe(location.pathname.split('/')[2]);
  }, [storeCurrentRecipe, location.pathname]);

  const renderInProgressPage = () => {
    if (video) {
      history.push(`/comidas/${id}/in-progress`);
    } else {
      history.push(`/bebidas/${id}/in-progress`);
    }
  };

  return (
    <Container>
      <Thumb title={ title } thumb={ thumb } />
      <Title id={ id } title={ title } subtitle={ subtitle } />
      <Ingredients ingredients={ ingredients } />
      <Instructions instructions={ instructions } />
      { video && <Video video={ video } /> }
      <Button
        onClick={ () => renderInProgressPage() }
        data-testid="start-recipe-btn"
        variant="warning"
        block
      >
        Iniciar Receita
      </Button>
    </Container>
  );
}

DetalhesComida.propTypes = {
  location: PropTypes.shape,
}.isRequired;
