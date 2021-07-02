import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/Context';
// import messageAlert from '../services/helpers/alertMessage';

// Tela principal de receitas de comidas: /comidas
export default function MainFood({ history }) {
  const { data } = useContext(RecipeContext);

  function renderMeal() {
    if (data.length === 1) {
      history.push(`/comidas/${data[0].idMeal}`);
    }
    return data.map((item, index) => (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
        <img
          src={ item.strMealThumb }
          alt="receita"
          data-testid={ `${index}-card-img` }
        />
      </div>
    ));
  }

  return (
    <div>
      <h4>Meals</h4>
      <Header history={ history } title="Comidas" />
      {
        data && renderMeal()
      }
      <Footer />
    </div>
  );
}

MainFood.propTypes = {
  history: PropTypes.shape().isRequired,
};
