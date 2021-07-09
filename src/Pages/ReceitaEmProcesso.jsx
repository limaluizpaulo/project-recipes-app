import React, { useContext, useEffect, useState } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Thumb from '../components/Details/Thumb';
import Title from '../components/Details/Title';
import IngredientsStep from '../components/Details/IngredientsStep';
import Instructions from '../components/Details/Instructions';

export default function ReceitaEmProcesso({ location }) {
  const { currentRecipe, storeCurrentRecipe } = useContext(Context);
  const {
    id, name, category, alcoholicOrNot, instructions, image, ingredients,
  } = currentRecipe;
  const [allStepsOk, setAllStepsOk] = useState(true);
  const history = useHistory();

  useEffect(() => {
    storeCurrentRecipe(location.pathname.split('/')[2]);
  }, []);

  useEffect(() => {
    let curr = location.pathname.split('/')[1];
    if (curr === 'comidas') {
      curr = 'meals';
    } else {
      curr = 'cocktails';
    }
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const checkboxes = document.querySelectorAll('input[type=\'checkbox\']');
    if (inProgress && checkboxes.length) {
      if (inProgress[curr]) {
        if (inProgress[curr][location.pathname.split('/')[2]]) {
          if ((inProgress[curr][location.pathname.split('/')[2]]).length === checkboxes.length) {
            setAllStepsOk(false);
          }
        }
      }
    }
  });

  // Atualiza o estatus de progresso, para habilitar o botão
  const stepsProgress = (steps) => {
    const completeSteps = [];

    if (ingredients && steps) {
      for (let index = 0; index < ingredients.length; index += 1) {
        completeSteps.push(steps[index].checked);
      }
    }

    setAllStepsOk(completeSteps.some((step) => step === false));
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
        <IngredientsStep
          currentRecipe={ currentRecipe }
          ingredients={ ingredients }
          stepsProgress={ stepsProgress }
        />
        <Instructions instructions={ instructions } />
        <Button
          onClick={ () => history.push('/receitas-feitas') }
          disabled={ allStepsOk }
          data-testid="finish-recipe-btn"
          variant="warning"
          block
        >
          Finalizar Receita
        </Button>
      </Container>
    ) : <Spinner variant="success" animation="border" />
  );
}

ReceitaEmProcesso.propTypes = {
  location: PropTypes.shape,
}.isRequired;
