import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import LoginProvider from '../context/LoginProvider';
import renderWithRouter from '../renderWithRouter';

describe('Check Page Login', () => {
  it('Checks if the page has heading "h1" with text "Login" ', () => {
    render(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Login',
    });

    expect(heading).toBeInTheDocument();
  });

  it('Checks if the page has two inputs', () => {
    render(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const email = screen.getByPlaceholderText('Email');

    userEvent.type(email, 'exemplo@exemplo.com.br');
    expect(email).toBeInTheDocument();
    expect(email).toHaveValue('exemplo@exemplo.com.br');

    const password = screen.getByPlaceholderText('Senha');
    userEvent.type(password, '123456');
    expect(password).toBeInTheDocument();
    expect(password).toHaveValue('123456');
  });

  it('Checks if the page has a button and redirect to page Recipes', () => {
    const { history } = renderWithRouter(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const email = screen.getByPlaceholderText('Email');
    userEvent.type(email, 'exemplo1@exemplo.com.br');
    expect(email).toBeInTheDocument();
    expect(email).toHaveValue('exemplo1@exemplo.com.br');

    const password = screen.getByPlaceholderText('Senha');
    userEvent.type(password, '123456');
    expect(password).toBeInTheDocument();
    expect(password).toHaveValue('123456');

    const button = screen.getByRole('button', {
      name: 'Entrar',
    });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
