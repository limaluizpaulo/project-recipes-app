import React, { createContext, useContext } from 'react';
import { node } from 'prop-types';

const MealsContext = createContext();

export default function MealsContextProvider({ children }) {
  // const [mealsFiltered, setMealsFiltered] = useState([]);

  return (
    <MealsContext.Provider
      value={ { setMealsFiltered } }
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMealsContext() {
  const context = useContext(MealsContext);

  const { setMealsFiltered } = context;
  return { setMealsFiltered };
}

MealsContextProvider.propTypes = {
  children: node.isRequired,
};
