/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailsProgress from '../Components/DetailsProgress';
import DrinkApi from '../services/BeverageRecipesAPI';
import MealAPI from '../services/MealRecipesAPI';

function Progress(props) {
  const { match: { params: { id } } } = props;
  const strType = window.location.href.includes('comidas') ? 'Meal' : 'Drink';
  const [disabled, setDisabled] = React.useState(false);

  const API = window.location.href.includes('comidas')
    ? MealAPI.getFoodById : DrinkApi.getDrinkById;

  return (
    <>
      <DetailsProgress
        id={ id }
        fetchAPI={ API }
        type={ strType }
        setDisabled={ setDisabled }
      />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => {} }
        disabled={ disabled }
      >
        Finalizar receita
      </button>
    </>
  );
}

Progress.propTypes = PropTypes.shape({}).isRequired;

const mapStateToProps = (state) => ({
  item: state.details.item,
  redirect: state.details.shouldRedirect,
});

export default connect(mapStateToProps)(Progress);
