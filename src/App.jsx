import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MainPageFood from './pages/MainPageFood';
import store from './store';
import Footer from './components/Footer';
import AppRecipeProvider from './context/AppRecipeProvider';

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
      <AppRecipeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/comidas" component={ MainPageFood } />
          </Switch>
        </BrowserRouter>
      </AppRecipeProvider>
    </Provider>
  );
}

export default App;
