import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import Header from '../components/Header';

describe('testa o Header', () => {
  it('Verifica se tem o título e os buttons', () => {
    renderWithRouterAndRedux(<Header title="título" />);

    const profileBtn = screen.getByAltText('profile-icon');
    expect(profileBtn.src).toContain('http://localhost/profileIcon.svg');

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle.innerHTML).toEqual('título');

    const searchInput = screen.getByTestId('search-top-btn');
    expect(searchInput).toBeInTheDocument();
  });

  it('testa se tem o botão de busca invisivel', () => {
    renderWithRouterAndRedux(<Header title="título" searchIcon />);

    const searchInput = screen.getByRole('button', { name: '' });
    expect(searchInput).toBeInTheDocument();
  });

  it('testa se vai para página de perfil', () => {
    const { history } = renderWithRouterAndRedux(<Header title="título" />);

    const profileBtn = screen.getByAltText('profile-icon');
    expect(profileBtn.src).toContain('http://localhost/profileIcon.svg');
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/perfil');
  });
});
