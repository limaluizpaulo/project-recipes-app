import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('deve renderizar o componente App', () => {
  const { getByText } = renderWithRouter(<App />);
  const login = getByText(/Você está na página Login/);
  expect(login).toBeInTheDocument();
});
