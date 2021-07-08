import { fireEvent } from '@testing-library/dom';
import React from 'react';
import ExploreMeals from '../pages/ExploreMeals';
import renderWithRouter from './renderWithRouter';

describe('Teste página ExploreMeals', () => {
  it('Testa se o título esta correto', () => {
    const { getByTestId } = renderWithRouter(<ExploreMeals />);
    const titulo = getByTestId('page-title');
    expect(titulo.textContent).toBe('Explorar Comidas');
  });
  it('Verifica se existem todos os botões na página', () => {
    const { getByTestId } = renderWithRouter(<ExploreMeals />);
    const porIngrediente = getByTestId('explore-by-ingredient');
    const porLocalOrigem = getByTestId('explore-by-area');
    const meSurpreenda = getByTestId('explore-surprise');
    expect(porIngrediente).toBeInTheDocument();
    expect(porLocalOrigem).toBeInTheDocument();
    expect(meSurpreenda).toBeInTheDocument();
  });
  it('Verifica se o botão Por Ingredientes funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreMeals />);
    const porIngrediente = getByTestId('explore-by-ingredient');
    fireEvent.click(porIngrediente);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });
  it('Verifica se o botão Por Local de Origem funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreMeals />);
    const porLocalOrigem = getByTestId('explore-by-area');
    fireEvent.click(porLocalOrigem);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });
  it('Verifica se o botão Me Surpreenda funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreMeals />);
    const meSurpreenda = getByTestId('explore-surprise');
    fireEvent.click(meSurpreenda);
    const { pathname } = history.location;
    expect(pathname).not.toBe('/explorar/comidas');
  });
});
