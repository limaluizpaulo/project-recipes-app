import { fireEvent } from '@testing-library/dom';
import React from 'react';
import ExploreDrinks from '../pages/ExploreDrinks';
import renderWithRouter from './renderWithRouter';

describe('Teste página ExploreDrinks', () => {
  it('Testa se o título esta correto', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const titulo = getByTestId('page-title');
    expect(titulo.textContent).toBe('Explorar Bebidas');
  });
  it('Verifica se existem todos os botões na página', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const porIngrediente = getByTestId('explore-by-ingredient');
    const meSurpreenda = getByTestId('explore-surprise');
    expect(porIngrediente).toBeInTheDocument();
    expect(meSurpreenda).toBeInTheDocument();
  });
  it('Verifica se o botão Por Ingredientes funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreDrinks />);
    const porIngrediente = getByTestId('explore-by-ingredient');
    fireEvent.click(porIngrediente);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
  it('Verifica se o botão Me Surpreenda funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreDrinks />);
    const meSurpreenda = getByTestId('explore-surprise');
    fireEvent.click(meSurpreenda);
    const { pathname } = history.location;
    expect(pathname).not.toBe('/explorar/bebidas');
  });
});
