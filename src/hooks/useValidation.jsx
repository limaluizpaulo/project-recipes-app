import { useState } from 'react';
// Hook costumizado que checa os erros e seta os erros
const useValidation = () => {
  const [passwordError, setPasswordError] = useState(true);
  const [emailerror, setEmailError] = useState(true);
  // Verifica se há mais de 6 char e altera o estado de passwordError
  const checkPassword = (password) => {
    const MIN_CHAR = 6;
    if (password.length > MIN_CHAR) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };
  // Verifica se o email passa pelo regex basico onde é buscado algo antes de um @ algo entre o @ e um . e algo depois do .
  // e então altera o valor do emailError
  const checkEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  // Verifica se existe erro
  const error = passwordError || emailerror;
  return {
    checkPassword,
    checkEmail,
    error,
  };
};

export default useValidation;
