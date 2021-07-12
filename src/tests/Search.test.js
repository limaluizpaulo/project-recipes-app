import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRoute from './renderWithRoute';

describe('Renders the Search', () => {
  it('should render the input type text ', () => {
    const { getByTestId } = renderWithRoute(<App />);

    const email = getByTestId('email-input');
    const pass = getByTestId('password-input');
    const botao = getByTestId('login-submit-btn');
    userEvent.type(email, 'anderson@gmail.com');
    userEvent.type(pass, '1234564');

    userEvent.click(botao);
    const search = getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
  });

  it('should render the input type checkbox for ingredients ', () => {
    const { getByTestId } = renderWithRoute(<App />);

    const checkbox = getByTestId('ingredient-search-radio');
    expect(checkbox).toBeInTheDocument();
  });

  it('should render the input type checkbox for name ', () => {
    const { getByTestId } = renderWithRoute(<App />);

    const checkbox = getByTestId('name-search-radio');
    expect(checkbox).toBeInTheDocument();
  });

  it('should render the input type checkbox for first leter ', () => {
    const { getByTestId } = renderWithRoute(<App />);

    const checkbox = getByTestId('first-letter-search-radio');
    expect(checkbox).toBeInTheDocument();
  });

  it('should render the button ', () => {
    const { getByTestId } = renderWithRoute(<App />);

    const checkbox = getByTestId('exec-search-btn');
    expect(checkbox).toBeInTheDocument();
  });
});
