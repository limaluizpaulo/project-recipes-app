import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProvider from './provider/user.provider';
import DrinksProvider from './provider/drinks.provider';
import MealsProvider from './provider/meals.provider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <UserProvider>
    <DrinksProvider>
      <MealsProvider>
        <App />
      </MealsProvider>
    </DrinksProvider>
  </UserProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
