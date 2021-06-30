import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import RenderWithRouter from './RenderWithRouter';
import App from './App';
import Login from './components/Login';

describe('testa tela de login', () => {
  test('verifica a existência do input de email', () => {
    const { getByPlaceholderText } = render(<Login />);
    const inputEmail = getByPlaceholderText(/email/i); 
    expect(inputEmail).toBeInTheDocument();
  });

  test('verifica a existência do input de senha', () => {
    const { getByPlaceholderText } = render(<Login />);
    const inputPassword = getByPlaceholderText(/senha/i); 
    expect(inputPassword).toBeInTheDocument();
  });

  test('verifica a existência do botão Entrar', () => {
    const { getByRole } = render(<Login />);
    const btnEntrar = getByRole('button', {
      name: /entrar/i,
    }); 
    expect(btnEntrar).toBeInTheDocument();
  });

  test('verifica se o botão Entrar habilita ao digitar valores válidos', () => {
    const { getByPlaceholderText, getByRole } = render(<Login />);
    const inputEmail = getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, 'user@email.com');
    expect(inputEmail).toHaveValue('user@email.com');

    const inputPassword = getByPlaceholderText(/senha/i);
    userEvent.type(inputPassword, '1234567');
    expect(inputPassword).toHaveValue('1234567');

    const btnEntrar = getByRole('button', {
      name: /entrar/i,
    });
    expect(btnEntrar).not.toBeDisabled();
  });

  test('verifica se o botão Entrar desabilita ao digitar valores inválidos', () => {
    const { getByPlaceholderText, getByRole } = render(<Login />);
    const inputEmail = getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, 'user');
    expect(inputEmail).toHaveValue('user');

    const inputPassword = getByPlaceholderText(/senha/i);
    userEvent.type(inputPassword, '123');
    expect(inputPassword).toHaveValue('123');

    const btnEntrar = getByRole('button', {
      name: /entrar/i,
    });
    expect(btnEntrar).toBeDisabled();
  });
});
