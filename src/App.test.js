import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';

describe('1 - Crie uma página inicial de login com os seguintes campos e características:', () => {
  test('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  
  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouterAndRedux(<App />);

    const inputLogin = screen.getByPlaceholderText('E-mail');
    const inputSenha = screen.getByPlaceholderText('Senha');

    expect(inputLogin).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
  });

  test('Crie um botão com o texto ENTRAR', () => {
    renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByText('ENTRAR');
    expect(loginButton).toBeInTheDocument();
  });
});

describe('2 - Realize as seguintes verificações nos campos de email, senha e botão:', () => {
  test('testa botão ENTRAR desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    
    const loginButton = screen.getByText('ENTRAR');
    expect(loginButton).toBeDisabled();
  });

  test('O botão de ENTRAR está desabilitado quando um email inválido é digitado', () => {
    renderWithRouterAndRedux(<App />);

    const inputLogin = screen.getByPlaceholderText('E-mail');
    const inputSenha = screen.getByPlaceholderText('Senha');
    const loginButton = screen.getByText('ENTRAR');

    userEvent.type(inputLogin, 'email');
    userEvent.type(inputSenha, VALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(inputLogin, 'email@com@');
    userEvent.type(inputSenha, VALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(inputLogin, 'emailcom@');
    userEvent.type(inputSenha, VALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(inputLogin, 'alguem@email.');
    userEvent.type(inputSenha, VALID_PASSWORD);
    expect(loginButton).toBeDisabled();
  });

  test('O botão de "Entrar está desabilitado quando uma senha inválida é digitada', () => {
    renderWithRouterAndRedux(<App />);

    const inputLogin = screen.getByPlaceholderText('E-mail');
    const inputSenha = screen.getByPlaceholderText('Senha');
    const loginButton = screen.getByText('ENTRAR');

    userEvent.type(inputLogin, VALID_EMAIL);
    userEvent.type(inputSenha, '234567');
    expect(loginButton).toBeDisabled();
  });

  test('O botão de "Entrar" está habilitado quando um email e uma senha válidos são passados', () => {
    renderWithRouterAndRedux(<App />);

    const inputLogin = screen.getByPlaceholderText('E-mail');
    const inputSenha = screen.getByPlaceholderText('Senha');
    const loginButton = screen.getByText('ENTRAR');

    userEvent.type(inputLogin, VALID_EMAIL);
    userEvent.type(inputSenha, VALID_PASSWORD);
    expect(loginButton).toBeEnabled();
  });
});
