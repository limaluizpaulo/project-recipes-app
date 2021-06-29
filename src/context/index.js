import React from 'react';
import PropTypes from 'prop-types';
import { UserProvider } from './UserProvider';
import { MealsProvider } from './MealsProvider';
import { DrinksProvider } from './DrinksProvider';

function Provider({ children }) {
  return (
    <UserProvider>
      <MealsProvider>
        <DrinksProvider>
          { children }
        </DrinksProvider>
      </MealsProvider>
    </UserProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
