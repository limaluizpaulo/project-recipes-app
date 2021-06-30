import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import store, { RECIPES, USER } from './store';
import userReducer from './reducers/user';
import recipesReducer from './reducers/recipes';

export default function Provider({ children }) {
  const [user, setUser] = useReducer(userReducer, USER);
  const [recipes, setRecipes] = useReducer(recipesReducer, RECIPES);

  // -------------------------------------------------------------------------------
  // CONTEXT
  const contextValue = {
    user,
    recipes,
    setUser,
    setRecipes,
  };

  // -------------------------------------------------------------------------------
  return (
    <store.Provider value={ contextValue }>
      { children }
    </store.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
