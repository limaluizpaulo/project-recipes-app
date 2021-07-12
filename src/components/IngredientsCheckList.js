import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import RecipeContext from '../context';
import { checkListIngredients } from '../helpers/handleStorageKeys';
import createListIngredients from '../helpers/ingredientsList';
import useInProgressRecipes from '../utils/useInProgressRecipes';

function IngredientsCheckList({ keyInProgress }) {
  const { recipes, idProgress, setIsDisable,
    checkedIngredients } = useContext(RecipeContext);
  const [countChecked, setCountChecked] = useInProgressRecipes(keyInProgress);
  const [listIngredients, setListIngredients] = useState([]);

  function handleDisable(counter) {
    if (counter < listIngredients.length) {
      return setIsDisable(true);
    }
    setIsDisable(false);
  }

  useEffect(() => {
    setListIngredients(createListIngredients(recipes));
  }, []);

  useEffect(() => {
    handleDisable(countChecked);
  }, [listIngredients]);

  function handleCheck({ target: { checked } }, index) {
    const checkCounter = checkListIngredients(
      { key: keyInProgress, checked, index, id: idProgress, countChecked },
    );
    setCountChecked(checkCounter);
    handleDisable(checkCounter);
  }

  return (
    <Form>
      {listIngredients.map((ingredient, index) => (
        <Form.Check
          key={ ingredient }
          label={ ingredient }
          name={ ingredient }
          type="checkbox"
          defaultChecked={ checkedIngredients.includes(index) }
          onClick={ (e) => handleCheck(e, index) }
          data-testid={ `${index}-ingredient-step` }
        />
      ))}
    </Form>
  );
}

IngredientsCheckList.propTypes = {
  keyInProgress: PropTypes.string.isRequired,
};

export default IngredientsCheckList;
