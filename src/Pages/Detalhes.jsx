import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Container, Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Thumb from '../components/Details/Thumb';
import Title from '../components/Details/Title';
import Ingredients from '../components/Details/Ingredients';
import Instructions from '../components/Details/Instructions';
import Video from '../components/Details/Video';

export default function DetalhesComida({ location }) {
  const { currentRecipe, storeCurrentRecipe } = useContext(Context);
  const {
    id, name, category, alcoholicOrNot, instructions, image, video, ingredients,
  } = currentRecipe;
  const history = useHistory();

  useEffect(() => {
    storeCurrentRecipe(location.pathname.split('/')[2]);
  }, []);

  const renderInProgressPage = () => {
    // localStorage.setItem( // add key no localStorage
    //   'inProgressRecipes',
    //   JSON.stringify(
    //     {
    //       cocktails: {},
    //       meals: {},
    //     },
    //   ),
    // );
    if (video) {
      history.push(`/comidas/${id}/in-progress`);
    } else {
      history.push(`/bebidas/${id}/in-progress`);
    }
  };

  return (
    image ? (
      <Container>
        <Thumb title={ name } thumb={ image } />
        <Title
          currentRecipe={ currentRecipe }
          id={ id }
          title={ name }
          subtitle={ !alcoholicOrNot ? category : alcoholicOrNot }
        />
        <Ingredients ingredients={ ingredients } />
        <Instructions instructions={ instructions } />
        { video && <Video video={ video } /> }
        <Button
          className="button-fixed"
          onClick={ () => renderInProgressPage() }
          data-testid="start-recipe-btn"
          variant="warning"
          block
        >
          Iniciar Receita
        </Button>
      </Container>
    ) : <Spinner variant="danger" animation="border" />
  );
}

DetalhesComida.propTypes = {
  location: PropTypes.shape,
}.isRequired;
