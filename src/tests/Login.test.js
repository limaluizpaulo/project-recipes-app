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
});
