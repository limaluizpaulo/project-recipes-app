/* import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { saveCockTailsToken,
  saveMealsToken, saveUserEmail } from '../storage/localStorage';

const REGEX_EMAIL = /\S+@\S+\.\S+/;

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [validation, setValidation] = useState(false);
  const history = useHistory();
  const { setInfo, userInfo } = useContext(RecipesContext);

  useEffect(() => {
    const passMin = 6;
    const { email, password } = user;
    setValidation((email.match(REGEX_EMAIL) && password.length > passMin));
  }, [user]);

  function handleInputChange({ target: { name, value } }) {
    setUser({ ...user, [name]: value });
  }

  function handleLoginClick() {
    const { email } = user;
    saveCockTailsToken();
    saveMealsToken();
    saveUserEmail({ email });
    setInfo({ ...userInfo, email });
    history.push('/comidas');
  }

  return (
    <div>
      Email:
      <input
        name="email"
        type="text"
        data-testid="email-input"
        onChange={ handleInputChange }
      />
      Senha:
      <input
        name="password"
        type="password"
        data-testid="password-input"
        onChange={ handleInputChange }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !validation }
        onClick={ handleLoginClick }
      >
        Entrar
      </button>
    </div>
  );
}
 */
export default function Login() {
  return (<h1>Deu certo!!</h1>);
}
