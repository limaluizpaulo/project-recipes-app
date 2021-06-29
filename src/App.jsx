import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={ store }>

      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
