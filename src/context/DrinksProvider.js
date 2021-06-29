import React from 'react'
import Context from './Context';

const DrinksProvider = ({ children }) => {
  return (
    <Context.Provider value={ store }>
      { children }
    </Context.Provider>
  )
}

export default DrinksProvider;
