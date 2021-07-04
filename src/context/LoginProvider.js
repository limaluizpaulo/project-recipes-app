import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [login, setLogin] = useState('');
  const [idsDoneRecipes, setIdsDoneRecipes] = useState([]);

  function successLogin(email) {
    setLogin(email);
  }

  function getDoneRecipes() {
    const ids = JSON.parse(localStorage.getItem('doneRecipes'));
    if (ids !== null) {
      setIdsDoneRecipes(ids);
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([{
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/6/2020',
        tags: [],
      },
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '22/6/2020',
        tags: ['Pasta', 'Curry'],
      }]));

      localStorage.setItem('inProgressRecipes', JSON.stringify(
        {
          meals: {
            52771: [],
          },
          cocktails: {
            178319: [],
          },
        },
      ));
      setIdsDoneRecipes(['178319', '52771']);
    }
  }

  return (
    <LoginContext.Provider
      value={ {
        successLogin,
        login,
        idsDoneRecipes,
        getDoneRecipes,
      } }
    >
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
