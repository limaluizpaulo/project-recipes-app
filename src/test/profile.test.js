import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const BUTTON_LOGIN_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '123456789';

// esta funçao faz a mesma coisa todas as vezes, entrar com o mesmo email, senha, e clicar em profile link
const entrarProfile = () => {
  const { getByTestId } = renderWithRouter(<App />);
  const inputEmail = getByTestId(EMAIL_INPUT_TEST_ID);
  const inputPassword = getByTestId(PASSWORD_INPUT_TEST_ID);
  const buttonLogin = getByTestId(BUTTON_LOGIN_ID);
  fireEvent.change(inputEmail, { target: { value: VALID_EMAIL } });
  fireEvent.change(inputPassword, { target: { value: VALID_PASSWORD } });
  fireEvent.click(buttonLogin);
  const buttonProfile = getByTestId('profile-top-btn');
  fireEvent.click(buttonProfile);
};
describe('entrar no perfil e estar de acordo com cada test', () => {
  it('testar se email aparece na pagina profile', () => {
    entrarProfile();
    const { getByText } = renderWithRouter(<App />);
    const email = getByText(VALID_EMAIL);
    expect(email).toBeInTheDocument();
  });

  it('todos os buttons estão presentes', () => {
    entrarProfile();
    const { getByTestId } = renderWithRouter(<App />);
    const receitasFeitas = getByTestId('profile-done-btn');
    const receitasFavoritas = getByTestId('profile-favorite-btn');
    const sair = getByTestId('profile-logout-btn');
    expect(receitasFeitas).toBeInTheDocument();
    expect(receitasFavoritas).toBeInTheDocument();
    expect(sair).toBeInTheDocument();
  });
});

describe('cada button executa de acordo com o test', () => {
  it('button "Receitas Feitas" troca de pagina', () => {
    entrarProfile();
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnReceitasFeitas = getByTestId('profile-done-btn');
    fireEvent.click(btnReceitasFeitas);
    const receitasFeitas = getByText('Receitas Feitas');
    expect(receitasFeitas).toBeInTheDocument();
  });
  it('button "Receitas Favoritas" troca de pagina', () => {
    entrarProfile();
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnReceitasFavoritas = getByTestId('profile-favorite-btn');
    fireEvent.click(btnReceitasFavoritas);
    const text = getByText('Receitas Favoritas');
    expect(text).toBeInTheDocument();
  });
  it('button "sair" troca de pagina', () => {
    entrarProfile();
    const { getByTestId } = renderWithRouter(<App />);
    const btnSair = getByTestId('profile-logout-btn');
    fireEvent.click(btnSair);
  });
});
