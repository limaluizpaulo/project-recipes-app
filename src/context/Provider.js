import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import store, { USER } from './store';
import userReducer from './reducers/user';

export default function Provider({ children }) {
  const [user, setUser] = useReducer(userReducer, USER);

  // -------------------------------------------------------------------------------
  // CONTEXT
  const contextValue = {
    user,
    setUser,
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
