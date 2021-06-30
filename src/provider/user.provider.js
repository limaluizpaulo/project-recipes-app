import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/user.context';

function UserProvider({ children }) {
  const [user, setUser] = useState({ email: '', password: '' });

  const shared = {
    user,
    setUser,
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
