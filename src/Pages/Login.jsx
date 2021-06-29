import React, { useContext } from 'react'

const Login = () => {
  const [ user, setUser] = useContext({
    email:'',
  password:'',
})
  handlechange({ target: { value, name } }) {
    const format = RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);
    if (name === 'email' && format.test(value)) {
      setUser({ ...user,
        email: value,
      });
    } else if (name === 'password' && value.length >= 6) {
      setUser({ ...user,
        password: value,
      });;
    }
  }
  return (
    <div>
    <form>
      <label htmlFor="email">
        <span>E-mail:</span>
        &nbsp;
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          onChange={ this.handlechange }
        />
      </label>
      <label htmlFor="password">
        <span>Senha:</span>
        &nbsp;
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          onChange={ this.handlechange }
        />
      
          <button
            onClick={ userToken }
            disabled={ !(email && password) }
            type="submit"
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
      
    </form>
    </div>
  )
}

export default Login
