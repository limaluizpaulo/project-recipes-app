import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../pages/Explore';
import renderWithRouter from './renderWithRouter';

describe('Teste página Explore', () => {
  it('Testa se o título esta correto', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');
    const titulo = getByTestId('page-title');
    expect(titulo).toBeInTheDocument();
  });
  it('Testa se existe os botões de explorar comidas e  bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');
    const explorarComida = getByTestId('explore-food');
    const explorarBebida = getByTestId('explore-drinks');
    expect(explorarComida).toBeInTheDocument();
    expect(explorarBebida).toBeInTheDocument();
  });
  it('Testa se o botão Explorar Comida vai para o caminho certo', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');
    const explorarComida = getByTestId('explore-food');
    fireEvent.click(explorarComida);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('Testa se o botão Explorar Bebida vai para o caminho certo', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');
    const explorarBebida = getByTestId('explore-drinks');
    fireEvent.click(explorarBebida);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
