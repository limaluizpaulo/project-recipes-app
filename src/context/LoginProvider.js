import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

export default function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassowd] = useState('');

  const successLogin = (emailText, passwordText) => {
    setEmail(emailText);
    setPassowd(passwordText);

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  // Receitas Feitas
  //  source: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  function doneDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;
    return today;
  }

  // const done = localStorage.getItem('doneRecipes');
  // const [dones, setDones] = useState();

  function doneRecipes(recipe) {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log('doneRecipes recipe', recipe);
    console.log('doneRecipes done', done);
    if (recipe.strAlcoholic === undefined) {
      localStorage.setItem('doneRecipes', JSON.stringify([...done, {
        id: recipe.idMeal,
        type: 'comidazz',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: null,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        doneDate: doneDate(),
        tags: recipe.strTags ? recipe.strTags.split(',') : null,
      }]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([...done, {
        id: recipe.idDrink,
        type: 'bebida',
        area: null,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: doneDate(),
        tags: recipe.strTags ? recipe.strTags.split(',') : null,
      }]));
    }
  }

  function doneDefault(recipe) {
    const done = localStorage.getItem('doneRecipes');
    // console.log('doneDefault', typeof recipe);
    if (done) {
      doneRecipes(recipe);
    } else if (recipe.strAlcoholic === undefined) {
      localStorage.setItem('doneRecipes', JSON.stringify([{
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: null,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        doneDate: doneDate(),
        tags: recipe.strTags ? recipe.strTags.split(',') : null,
      }]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([{
        id: recipe.idDrink,
        type: 'bebida',
        area: null,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: doneDate(),
        tags: recipe.strTags !== null ? recipe.strTags.split(',') : null,
      }]));
    }
  }

  const context = {
    email,
    password,
    successLogin,
    doneDefault,
  };

  return (
    <LoginContext.Provider
      value={ context }
    >
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
