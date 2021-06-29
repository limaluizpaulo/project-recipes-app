import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import MainPageFood from './pages/MainPageFood';

function App() {
  return (
    <Provider store={ store }>

      <div className="meals">
        <MainPageFood />
      </div>
    </Provider>
  );
}

export default App;
