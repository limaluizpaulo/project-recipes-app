import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import Perfil from '../pages/Perfil';

describe('Teste da página de perfil', () => {
  it('testa o header', () => {
    renderWithRouterAndRedux(<Perfil />);

    const pageTitle = screen.getByText('Perfil');
    expect(pageTitle).toBeInTheDocument();

    const profileBtn = screen.getByAltText('profile-icon');
    expect(profileBtn.src).toContain('http://localhost/profileIcon.svg');
  });

  it('testa o email', () => {
    renderWithRouterAndRedux(<Perfil />);

    // const email = screen.getByTestId('profile-email');
    // expect(email).toEqual('email@email.com');
  });

  it('testa o link para Receitas feitas', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const receitasFeitas = screen.getByTestId('profile-done-btn');
    expect(receitasFeitas).toBeInTheDocument();
    fireEvent.click(receitasFeitas);
    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it('testa o link para Receitas Favoritas', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const receitasFavoritas = screen.getByTestId('profile-favorite-btn');
    expect(receitasFavoritas).toBeInTheDocument();
    fireEvent.click(receitasFavoritas);
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  it('testa o link para sair', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const sair = screen.getByTestId('profile-logout-btn');
    expect(sair).toBeInTheDocument();
    fireEvent.click(sair);
    expect(history.location.pathname).toBe('/');
  });

  it('testa o footer', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const drinksBtn = screen.getByAltText('drinks');
    expect(drinksBtn.src).toContain('http://localhost/drinkIcon.svg');
    fireEvent.click(drinksBtn);
    expect(history.location.pathname).toBe('/bebidas');

    const exploreBtn = screen.getByAltText('explore');
    expect(exploreBtn.src).toContain('http://localhost/exploreIcon.svg');
    fireEvent.click(exploreBtn);
    expect(history.location.pathname).toBe('/explorar');

    const foodsBtn = screen.getByAltText('food');
    expect(foodsBtn.src).toContain('http://localhost/mealIcon.svg');
    fireEvent.click(foodsBtn);
    expect(history.location.pathname).toBe('/comidas');
  });
});
