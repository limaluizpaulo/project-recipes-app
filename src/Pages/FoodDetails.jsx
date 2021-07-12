/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProgressItem } from '../services/services';
import { GetRecipesDetails, getFoods } from '../redux/actions';
import Details from '../Components/Details';
import CarroselBebidas from '../Components/CarroselBebidas';
import BeverageAPI from '../services/BeverageRecipesAPI';
import MealRecipesAPI from '../services/MealRecipesAPI';

import '../styles/Buttons.css';

const FoodDetails = (props) => {
  const { match: { params: { id } } } = props;
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const inProgressItems = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  const inProgressItemsIDs = Object.keys(inProgressItems.meals || {});
  const {
    getId,
    food,
    redirect,
  } = props;

  async function resultFood() {
    const listRecomendations = await BeverageAPI.getByDefault();
    setItem({ listRecomendations });
  }

  useEffect(() => {
    if (loading) {
      getId(id)
        .then(() => resultFood()
          .then(() => setLoading(false)));
    }
  }, []);

  return !redirect ? <h3>Loading</h3>
    : (
      <div className="card-details">
        { food.map((foodItem, index) => (
          <React.Fragment key={ index }>
            <Details id={ id } item={ foodItem } type="Meal" />
            <CarroselBebidas recomendations={ item.listRecomendations || [] } />
            <Link to={ `/comidas/${id}/in-progress` }>
              <button
                className="start"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => setProgressItem(id, 'meals') }
              >
                {inProgressItemsIDs.includes(id)
                  ? 'Continuar Receita' : 'Iniciar Receita'}

              </button>
            </Link>
          </React.Fragment>

        ))}
      </div>
    );
};

FoodDetails.propTypes = PropTypes.shape({}).isRequired;

const mapStateToProps = (state) => ({
  food: state.details.item,
  redirect: state.details.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  getId: (value) => dispatch(GetRecipesDetails(value, MealRecipesAPI.getFoodById)),
  getDrinkId: (value, callback) => dispatch(getFoods(value, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);
