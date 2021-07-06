import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

export default function IngredientsStep({ ingredients, currentRecipe, stepsProgress }) {
  const [stepsClassName, setStepsClassName] = useState([]);
  const { curr } = useContext(Context);

  // Pupula o estado que gerencia a classe CSS dos ingredientes
  const populateSteps = () => {
    const steps = [];

    if (ingredients) {
      for (let index = 0; index <= ingredients.length; index += 1) {
        steps.push({
          step: 'step-not-checked',
          checked: false,
          index,
        });
      }
    }

    setStepsClassName(steps);
  };

  useEffect(() => {
    populateSteps();
  }, [ingredients]);

  // Adiciona o progresso da receita em localstorage
  const addLocalStorageIngredient = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { id, video } = currentRecipe;
    console.log(currentRecipe);
    if (inProgress === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ [curr]: { [id]: [] } }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ ...inProgress, [curr]: { [id]: [] } }));
    }
  };

  // Adiciona efeito ao clicar em um item da lista de ingredientes
  const doneStepEffect = ({ id: targetId }) => {
    let step = 'step-checked';
    console.log(targetId);

    if (stepsClassName[targetId].checked) {
      step = 'step-not-checked';
    }

    setStepsClassName([
      ...stepsClassName,
      stepsClassName[targetId].checked = !stepsClassName[targetId].checked,
      stepsClassName[targetId].step = step,
    ]);

    addLocalStorageIngredient();
    stepsProgress(stepsClassName);
  };

  return (
    <Container>
      <h4>Ingredientes</h4>
      <table width="100%">
        <tbody>
          {
            ingredients && ingredients.map(({ ingredient, measure }, index) => (
              <tr key={ index } data-testid={ `${index}-ingredient-step` }>
                <input
                  type="checkbox"
                  id={ `${index}` }
                  value={ `${index}-ingredient` }
                  onChange={ ({ target }) => doneStepEffect(target) }
                />
                <label
                  className={ stepsClassName[index] && stepsClassName[index].step }
                  htmlFor={ `${index}` }
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
