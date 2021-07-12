import React from 'react';
// import {  } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';

describe('Teste componente Header', () => {
  it('Verifica funcionalidades do header', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    const header = getByTestId('header-top');
    expect(header).toBeInTheDocument();
  });

  it('verifica exsitencia do ícone de perfil', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
  });

  it('verifica exsitencia do título', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
});
