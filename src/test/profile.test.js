import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const BUTTON_LOGIN_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '123456789';

describe('entrar no perfil e estar de acordo com cada test', () => {
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
    
  });
});
