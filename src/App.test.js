import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Recipes APP', () => {
  test('renderiza a página inicial ao entrar no app', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialState: {
          foodReducer: {},
          drinkReducer: {},
        },
      },
    );

    const inputLogin = screen.getByPlaceholderText('E-mail');
    expect(inputLogin).toBeInTheDocument();

    const inputSenha = screen.getByPlaceholderText('Senha');
    expect(inputSenha).toBeInTheDocument();
  });

  test('testa botão desabilitado', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialState: {
          foodReducer: {},
          drinkReducer: {},
        },
      },
    );

    const inputLogin = screen.getByPlaceholderText('E-mail');
    const inputSenha = screen.getByPlaceholderText('Senha');

    userEvent.type(inputLogin, '');
    userEvent.type(inputSenha, '');

    const loginButton = screen.getByText('ENTRAR');
    expect(loginButton).toBeDisabled();
  });

  test('faz o login após digitar o email e a senha', () => {
    renderWithRouterAndRedux(
      <App />,
      {
        initialState: {
          foodReducer: {},
          drinkReducer: {},
        },
      },
    );

    const inputLogin = screen.getByPlaceholderText('E-mail');
    const inputSenha = screen.getByPlaceholderText('Senha');

    userEvent.type(inputLogin, 'exemplo@exemplo.com');
    userEvent.type(inputSenha, 'exemplo');

    const loginButton = screen.getByText('ENTRAR');
    expect(loginButton).not.toBeDisabled();
  });
});
