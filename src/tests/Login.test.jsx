import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const VALID_EMAIL = 'accecpt@accept.com';
const VALID_PASSWORD = '1234567';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('1 - Testing the login page from Recipes App', () => {
  it('login location.pathname should be "/"', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('login and password, labels', () => {
    const { getByLabelText } = renderWithRouter(<App />);
    const emailLabel = getByLabelText(/email/i);
    expect(emailLabel).toBeInTheDocument();
    const passwordLabel = getByLabelText(/password/i);
    expect(passwordLabel).toBeInTheDocument();
  });

  it('email and password inputs', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });

  it('loggin button disabled when load the login page and with text "logar" ', () => {
    const { getByRole } = renderWithRouter(<App />);
    const logginBtn = getByRole('button', { name: /logar/i });
    expect(logginBtn).toBeInTheDocument();
    expect(logginBtn).toBeDisabled();
  });
});

describe('2 - testing the loggin button usability when type emails and passwords', () => {
  it('button disabled when type a invalid email', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const logginBtn = getByRole('button', { name: /logar/i });

    userEvent.type(emailInput, 'email@email');
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, 'email@');
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, 'email.com');
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, 'email');
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(logginBtn).toBeDisabled();
  });

  it('button disabled when type a invalid password', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const logginBtn = getByRole('button', { name: /logar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '1');
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '12');
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '123');
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '1234');
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '12345');
    expect(logginBtn).toBeDisabled();
  });
});

describe('3 - button loggin be able when valid email and password are inserted', () => {
  it('button should be able', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const logginBtn = getByRole('button', { name: /logar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(logginBtn).toBeEnabled();
  });
});
