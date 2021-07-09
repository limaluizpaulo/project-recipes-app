import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

export default function IngredientsStep({ ingredients, currentRecipe, stepsProgress }) {
  const [stepsClassName, setStepsClassName] = useState([]);
  const { curr } = useContext(Context);
  const RADIX = 10;
  const steps = [];
  const STRIPE_CLASS = 'step-checked';
  const NOT_STRIPE_CLASS = 'step-not-checked';

  const generateNoClassElements = () => {
    if (ingredients) {
      for (let index = 0; index <= ingredients.length; index += 1) {
        steps.push({
          step: NOT_STRIPE_CLASS,
          checked: false,
          index,
        });
      }
    }
    setStepsClassName(steps);
  };

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const checkboxes = document.querySelectorAll('input[type=\'checkbox\']');

    if (inProgress) {
      if (!inProgress[curr]) {
        if (ingredients) {
          for (let index = 0; index < ingredients.length; index += 1) {
            steps.push({
              step: NOT_STRIPE_CLASS,
              checked: false,
              index,
            });
          }
        }
        setStepsClassName(steps);
        return;
      }
      const keys = Object.keys(inProgress[curr]);
      const recipe = keys.find((key) => key === currentRecipe.id);

      if (recipe) {
        const arrayIds = inProgress[curr][currentRecipe.id];
        let className = '';
        let classValue = false;

        for (let index = 0; index < ingredients.length; index += 1) {
          for (let index2 = 0; index2 < arrayIds.length; index2 += 1) {
            if (index === (Number.parseInt(arrayIds[index2], RADIX))) {
              className = STRIPE_CLASS;
              classValue = true;
              checkboxes[index].checked = true;
              break;
            } else {
              className = NOT_STRIPE_CLASS;
              classValue = false;
            }
          }
          steps.push({
            step: className,
            checked: classValue,
            index,
          });
        }
        setStepsClassName(steps);
      }
    } else {
      generateNoClassElements();
    }
  }, []);

  // Pupula o estado que gerencia a classe CSS dos ingredientes
  const populateSteps = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgress) {
      if (!inProgress[curr]) {
        return;
      }
      const keys = Object.keys(inProgress[curr]);
      const recipe = keys.find((key) => key === currentRecipe.id);

      if (recipe) {
        return;
      }

      if (ingredients) {
        for (let index = 0; index < ingredients.length; index += 1) {
          steps.push({
            step: NOT_STRIPE_CLASS,
            checked: false,
            index,
          });
        }
      }
      setStepsClassName(steps);
    }
  };

  // carrega local storage dos ingredientes
  const loadIngredientesLocalStorage = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { id } = currentRecipe;
    switch (!inProgress) {
    case true:
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ [curr]: { [id]: [] } }));
      break;
    default:
      if (!inProgress[curr] || !inProgress[curr][id]) {
        localStorage.setItem('inProgressRecipes', JSON
          .stringify({
            ...inProgress,
            [curr]: { ...inProgress[curr], [id]: [] },
          }));
      // } else if (!inProgress[curr][id]) {
        // localStorage.setItem('inProgressRecipes', JSON
        //   .stringify({
        //     ...inProgress,
        //     [curr]: { ...inProgress[curr], [id]: [] },
        //   }));
      } else {
        localStorage.setItem('inProgressRecipes', JSON
          .stringify({
            ...inProgress,
            [curr]:
              { ...inProgress[curr],
                [id]: [...inProgress[curr][id]],
              } })); // dps passar o spread pros ids
      }
    }
  };

  const addOnceLocalStorage = (id, array, targetId) => {
    if (array[curr][id].includes(targetId)) {
      const updatedArray = array[curr][id].filter(
        (arrayId) => Number.parseInt(arrayId, RADIX) !== Number.parseInt(targetId, RADIX),
      );

      localStorage.setItem('inProgressRecipes', JSON
        .stringify({
          ...array,
          [curr]: { ...array[curr],
            [id]: [...updatedArray,
            ] } }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({
          ...array,
          [curr]: { ...array[curr],
            [id]: [...array[curr][id],
              targetId] } }));
    }
  };

  useEffect(() => {
    populateSteps();
    loadIngredientesLocalStorage();
  }, [ingredients]);

  // Adiciona efeito ao clicar em um item da lista de ingredientes
  const doneStepEffect = ({ id: targetId }) => {
    const newLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { id } = currentRecipe;

    let step = STRIPE_CLASS;

    if (stepsClassName[targetId].checked) {
      step = NOT_STRIPE_CLASS;
    }

    setStepsClassName([
      ...stepsClassName,
      stepsClassName[targetId].checked = !stepsClassName[targetId].checked,
      stepsClassName[targetId].step = step,
    ]);
    stepsProgress(stepsClassName);
    // adciona no localStorage
    addOnceLocalStorage([id], newLocalStorage, [targetId][0]);
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
