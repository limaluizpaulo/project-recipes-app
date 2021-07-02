import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/user.context';

function UserProvider({ children }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [mealsFavorite, setMealsFavorite] = useState([{ id: '' }]);
  const [drinksFavorite, setDrinksFavorite] = useState([{ id: '' }]);

  const shared = {
    user,
    setUser,
    mealsFavorite,
    setMealsFavorite,
    drinksFavorite,
    setDrinksFavorite,
  };

  return (
    <UserContext.Provider value={ { ...shared } }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
