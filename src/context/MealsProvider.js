import React from 'react'
import Context from './Context';

const MealsProvider = ({ children }) => {
  return (
    <Context.Provider value={ store }>
      { children }
    </Context.Provider>
  )
}

export default MealsProvider;
