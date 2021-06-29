import React from 'react';
import App from '../App';
import renderWithRoute from './renderWithRoute';

describe('Renderiza a Pagina Login', () => {
  it('Renderiza o input', () => {
    const { getByTestId } = renderWithRoute(<App />);

    const input = getByTestId('email-input');
    expect(input).toBeInTheDocument();
  });
});
