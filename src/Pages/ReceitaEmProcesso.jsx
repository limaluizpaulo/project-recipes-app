import React, { useContext, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Thumb from '../components/Details/Thumb';
import Title from '../components/Details/Title';
import IngredientsStep from '../components/Details/IngredientsStep';
import Instructions from '../components/Details/Instructions';

export default function ReceitaEmProcesso({ location }) {
  const { currentRecipe, storeCurrentRecipe } = useContext(Context);
  const { id, title, subtitle, instructions, thumb, ingredients } = currentRecipe;
  const [allStepsOk, setAllStepsOk] = useState(true);
  const history = useHistory();

  useEffect(() => {
    storeCurrentRecipe(location.pathname.split('/')[2]);
  }, []);

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
    <Container>
      <Thumb title={ title } thumb={ thumb } />
      <Title id={ id } title={ title } subtitle={ subtitle } />
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
        { (allStepsOk) ? 'Coninuar Receita' : 'Finalizar Receita' }
      </Button>
    </Container>
  );
}

ReceitaEmProcesso.propTypes = {
  location: PropTypes.shape,
}.isRequired;
