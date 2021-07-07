import React from 'react';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import LoginProvider from '../context/LoginProvider';
import renderWithRouter from '../renderWithRouter';

describe('Checks Page Login', () => {
  it('Checks if the page has heading "h1" with text "Login" ', () => {
    render(
      <LoginProvider>
        <Login />
      </LoginProvider>,
    );

    const heading = screen.getByAltText('logo');

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

    const button = screen.getByRole('button', {
      name: 'Entrar',
    });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const email = screen.getByPlaceholderText('Email');
    userEvent.type(email, 'email@mail.com');
    expect(email).toBeInTheDocument();
    expect(email).toHaveValue('email@mail.com');

    const password = screen.getByPlaceholderText('Senha');
    userEvent.type(password, '1234567');
    expect(password).toBeInTheDocument();
    expect(password).toHaveValue('1234567');

    userEvent.click(button);

    expect(button).not.toBeDisabled();

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
