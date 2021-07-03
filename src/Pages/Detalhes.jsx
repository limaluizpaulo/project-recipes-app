import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import { Container, Button } from 'react-bootstrap';
import Thumb from '../components/Details/Thumb';
import Title from '../components/Details/Title';
import Ingredients from '../components/Details/Ingredients';
import Instructions from '../components/Details/Instructions';
import Video from '../components/Details/Video';

export default function DetalhesComida({ location }) {
  const { currentRecipe, storeCurrentRecipe } = useContext(Context);
  const { id, title, subtitle, instructions, thumb, video, ingredients} = currentRecipe;

  useEffect(() => {
      storeCurrentRecipe(location.pathname.split('/')[2]);
  }, [])

  return (
    <Container>
      <Thumb title={ title } thumb={ thumb } />
      <Title id={ id } title={ title } subtitle={ subtitle } />
      <Ingredients ingredients={ ingredients } />
      <Instructions instructions={ instructions } />
      { video && <Video video={ video } /> }
      <Button
        data-testid="start-recipe-btn"
        variant="warning"
        block
      >
        Iniciar Receita
      </Button>
    </Container>
  );
}
