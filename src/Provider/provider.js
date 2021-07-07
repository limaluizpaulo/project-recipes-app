import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function Provider({ children }) {
  const [user, setUser] = useState({
    userEmail: '',
    password: '',
  });
  // const [favoriteRecipes, setFavoriteRecipes] = useState([{
  //   id: '',
  //   type: '',
  //   area: '',
  //   category: '',
  //   alcoholicOrNot: '',
  //   name: '',
  //   image: '',
  // }]);
  const [inProgress, setInProgress] = useState(false);
  const [favorited, setFavorited] = useState(false);

  // localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  const context = {
    user,
    setUser,
    inProgress,
    setInProgress,
    favorited,
    setFavorited,
    // favoriteRecipes,
    // setFavoriteRecipes,
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
