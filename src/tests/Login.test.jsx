import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing the login page from Recipes App', () => {
  it('login and password, labels', () => {
    const { getByLabelText } = renderWithRouter(<App />);
    const emailLabel = getByLabelText(/email/i);
    expect(emailLabel).toBeInTheDocument();
    const passwordLabel = getByLabelText(/password/i);
    expect(passwordLabel).toBeInTheDocument();
  });

  it('email inputs', () => {
    const { getByRole } = renderWithRouter(<App />);
    const emailInput = getByRole('textbox', { name: /email/i });
    expect(emailInput).toBeInTheDocument();
    // const passwordInput = getByRole('textbox', { name: 'Password' });
    // expect(passwordInput).toBeInTheDocument();
  });
});
