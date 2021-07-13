import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function Provider({ children }) {
  const [user, setUser] = useState({
    userEmail: '',
    password: '',
  });
  const [inProgress, setInProgress] = useState(false);
  const [dataFood, setDataFood] = useState([]);
  const [dataDrink, setDataDrink] = useState([]);

  const context = {
    user,
    setUser,
    inProgress,
    setInProgress,
    dataFood,
    setDataFood,
    dataDrink,
    setDataDrink,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
