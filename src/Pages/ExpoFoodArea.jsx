/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Card from '../Components/Card';
import { setList12 } from '../services/services';
import { setArea, getAreas } from '../redux/actions';
import fetchByArea from '../services/fetchByArea';
import api from '../services/MealRecipesAPI';
import Footer from '../Components/Footer';
import Loading from '../Components/Loading';

function ExpoFoodArea(props) {
  const { localsReceived, locals = [], infoFoods, foods } = props;
  const [listFood, setListFood] = useState([]);
  useEffect(() => {
    localsReceived();
  }, []);

  useEffect(() => {
    api.getByDefault()
      .then((res) => setListFood(res));
  }, []);

  useEffect(() => {
    setListFood(foods);
  }, [foods]);

  async function handlechange({ target: { value } }) {
    /* if (value === 'All') {
      api.getByDefault()
    } */
    await infoFoods(value, api.foodsArea);
  }
  return locals.length === 0 ? <Loading /> : (
    <div className="tela-explore">
      <Header title="Explorar Origem" />
      <div className="div-select">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ handlechange }
          className="select-area"
        >
          <option data-testid="All-option">All</option>

          {locals.length !== 0
        && locals.map((local) => (
          <option
            key={ local.strArea }
            value={ local.strArea }
            data-testid={ `${local.strArea}-option` }
          >
            {local.strArea}
          </option>
        ))}
        </select>
      </div>
      <div className="items-list">
        {setList12(listFood).map((food, index) => (
          <Card title="comidas" key={ index } index={ index } item={ food } type="meal" />
        ))}
      </div>
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => ({
  locals: state.mealsArea.areaNames,
  foods: state.foods.areaSelect,
});
const mapDispatchToProps = (dispatch) => ({
  localsReceived: () => dispatch(setArea(fetchByArea)),
  infoFoods: (value, callback) => dispatch(getAreas(value, callback)),
});

ExpoFoodArea.propTypes = {
  localsReceived: PropTypes.any,
  foods: PropTypes.any,
  locals: PropTypes.any,
  infoFoods: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpoFoodArea);
