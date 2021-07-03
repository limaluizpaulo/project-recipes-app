import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function IngredientsStep({ ingredients }) {
  const [stepsClassName, setStepsClassName] = useState([]);

  useEffect(() => {
    populateSteps();
  }, [ingredients]);

  const populateSteps = () => {
    const steps = [];
    ingredients && ingredients.map(( _, index) => {
      steps.push({
        step: 'step-not-checked',
        checked: false,
      })
    });
    setStepsClassName(steps);
  };

  const doneStepEffect = ({ id }) => {
    let step = 'step-checked';
    if (stepsClassName[id].checked) {
      step = 'step-not-checked'
    }
    setStepsClassName([
      ...stepsClassName,
      stepsClassName[id].checked = !stepsClassName[id].checked,
      stepsClassName[id].step = step,
    ]);
  }

  return (
    <Container>
      <h4>Ingredientes</h4>
      <table width="100%">
        <tbody>
          {
            ingredients && ingredients.map(({ ingredient, measure }, index) => (
              <tr key={ index }>
                <input
                  type="checkbox"
                  id={`${index}-ingredient`}
                  value={`${index}-ingredient`}
                />
                <label
                  onClick={ ({ target }) => doneStepEffect(target) }
                  className={ stepsClassName[index] && stepsClassName[index].step }
                  id={`${index}`}
                  htmlFor={`${index}-ingredient`}
                  data-testid={`${index}-ingredient-step`}
                >
                  {`${ingredient} - ${measure}`}
                </label>
              </tr>
            ))
          }
        </tbody>
      </table>
      <br />
    </Container>
  );
}

IngredientsStep.propTypes = {
  ingredients: PropTypes.array,
}.isRequired;
