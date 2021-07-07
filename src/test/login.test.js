import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const BUTTON_LOGIN_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '123456789';
describe('testar inputs data-testid', () => {
  it('input "email-input" existe', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const inputEmail = getByTestId(EMAIL_INPUT_TEST_ID);
    expect(inputEmail).toBeInTheDocument();
  });
  it('input "password-input" existe', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const inputPassword = getByTestId(PASSWORD_INPUT_TEST_ID);
    expect(inputPassword).toBeInTheDocument();
  });
  it('input "login-submit-btn" existe', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonLogin = getByTestId(BUTTON_LOGIN_ID);
    expect(buttonLogin).toBeInTheDocument();
  });
});

describe('inputs de email e senha mudam seu valor', () => {
  it('input "email-input" recebe dados', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const inputEmail = getByTestId(EMAIL_INPUT_TEST_ID);
    expect(inputEmail).toHaveValue('');
    fireEvent.change(inputEmail, { target: { value: VALID_EMAIL } });
    expect(inputEmail).toHaveValue(VALID_EMAIL);
  });
  it('input "password-input" recebe dados', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const inputPassword = getByTestId(PASSWORD_INPUT_TEST_ID);
    expect(inputPassword).toHaveValue('');
    fireEvent.change(inputPassword, { target: { value: VALID_PASSWORD } });
    expect(inputPassword).toHaveValue(VALID_PASSWORD);
  });
});

describe('Realize as seguintes verificações nos campos de email, senha e botão:', () => {
  it('O botão de "Entrar" está desabilitado ao entrar na página', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonLogin = getByTestId(BUTTON_LOGIN_ID);
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();
  });
  it('button desabilitado com email mas sem senha', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const inputEmail = getByTestId(EMAIL_INPUT_TEST_ID);
    fireEvent.change(inputEmail, { target: { value: VALID_EMAIL } });
    const buttonLogin = getByTestId(BUTTON_LOGIN_ID);
    expect(buttonLogin).toBeDisabled();
  });
  it('button desabilitado com senha mas sem email valito', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const inputPassword = getByTestId(PASSWORD_INPUT_TEST_ID);
    fireEvent.change(inputPassword, { target: { value: VALID_PASSWORD } });
    const buttonLogin = getByTestId(BUTTON_LOGIN_ID);
    expect(buttonLogin).toBeDisabled();
  });

  test('O botão de "Entrar" está habilitado quando um email e uma senha válidos', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const inputEmail = getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = getByTestId(PASSWORD_INPUT_TEST_ID);
    const buttonLogin = getByTestId(BUTTON_LOGIN_ID);
    fireEvent.change(inputEmail, { target: { value: VALID_EMAIL } });
    fireEvent.change(inputPassword, { target: { value: VALID_PASSWORD } });
    expect(buttonLogin).toBeEnabled();
  });
  it('deve mudar para rota /comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const inputEmail = getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = getByTestId(PASSWORD_INPUT_TEST_ID);
    const buttonLogin = getByTestId(BUTTON_LOGIN_ID);
    fireEvent.change(inputEmail, { target: { value: VALID_EMAIL } });
    fireEvent.change(inputPassword, { target: { value: VALID_PASSWORD } });
    fireEvent.click(buttonLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
