import React, { useState }  from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassoword] = useState('');

  return (
    <div>
      
      <label><label htmlFor="email"></label>
      <input 
      value={email} 
      type="email" 
      data-testid="email-input" 
      onChange={(e) => setEmail(e.target.value)}>
      </input>
      </label>
      <label htmlFor="password">
      <input 
      id="password"
      value={password} 
      type="password" 
      data-testid="password-input" 
      onChange={(e) => setPassoword(e.target.value)}></input>
      </label>
      <button data-testid="login-submit-btn">Login</button>
    </div>
  );
};

export default Login;
