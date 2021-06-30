import React from 'react';
import AppContext from './Context';

function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);

  const listOfContext = {
    state,
    setstate,
  };

  return (
    <AppContext.Provider value={ { listOfContext } }>
      { children }
    </AppContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
