import { useState } from 'react';

const useValidation = () => {
  const [passwordError, setPasswordError] = useState(true);
  const [emailerror, setEmailError] = useState(true);

  const checkPassword = (password) => {
    const MIN_CHAR = 6;
    if (password.length > MIN_CHAR) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const checkEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const error = passwordError || emailerror;
  return {
    checkPassword,
    checkEmail,
    error,
  };
};

export default useValidation;
