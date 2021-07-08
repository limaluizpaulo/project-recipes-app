import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Card from '../Components/Card';
import { setList } from '../services/services';
import { setArea, getAreas } from '../redux/actions';
import fetchByArea from '../services/fetchByArea';
import api from '../services/MealRecipesAPI';
import Footer from '../Components/Footer';
import '../styles/Card.css';

function ExpoFoodArea(props) {
  const { localsReceived, locals, infoFoods, foods } = props;
  const twelve = 12;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      localsReceived();
      setLoading(false);
    }
  }, [localsReceived, setLoading, loading]);

  async function handlechange({ target: { value } }) {
    await infoFoods(value, api.foodsArea);
  }
  return loading ? <div> loading... </div> : (
    <div>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handlechange }
      >
        {locals.map((local, index) => {
          if (index < twelve) {
            return (
              <option
                value={ local.strArea }
                data-testid={ `${local.strArea}-option` }
              >
                {local.strArea}
              </option>
            );
          }
          return null;
        })}
      </select>
      <div className="items-list">
        {setList(foods).map((food, index) => (
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
