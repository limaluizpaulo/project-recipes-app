import React from 'react';
import { useLocation } from 'react-router-dom';
import MealsDetails from '../components/MealsDetails';
import DrinksDetails from '../components/DrinksDetails';

export default function IdFood() {
  const { pathname } = useLocation();
  return (
    <main>
      {pathname.includes('/comidas') ? <MealsDetails /> : <DrinksDetails />}
    </main>
  );
}
