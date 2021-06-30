import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRoute from './renderWithRoute';

describe('Renderiza a Pagina Login', () => {
  it('Renderiza o input de email', () => {
    const { getByTestId } = renderWithRoute(<App />);

    const input = getByTestId('email-input');
    expect(input).toBeInTheDocument();
  });

  it('Renderiza o input de senha', () => {
    const { getByTestId } = renderWithRoute(<App />);

    const input = getByTestId('password-input');
    expect(input).toBeInTheDocument();
  });

  it('Renderiza o botão', () => {
    const { getByTestId } = renderWithRoute(<App />);

    const button = getByTestId('login-submit-btn');
    expect(button).toBeInTheDocument();
  });
});

describe('Interage com a pagina de login', () => {
  it('Renderiza o input de email', () => {
    const { getByTestId, getByText } = renderWithRoute(<App />);

    const email = getByTestId('email-input');
    const pass = getByTestId('password-input');
    const botao = getByTestId('login-submit-btn');
    userEvent.type(email, 'anderson@gmail.com');
    userEvent.type(pass, '1234564');

    expect(email).toHaveAttribute('value', 'anderson@gmail.com');
    expect(pass).toHaveAttribute('value', '1234564');

    userEvent.click(botao);

    const text = getByText('Comidas');
    expect(text).toBeInTheDocument();
  });
});
