/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../Components/Footer';
import HeadBar from '../Components/HeadBar';
import Card from '../Components/Card';
import MealsAPI from '../services/MealRecipesAPI';
import setList from '../services/services';
import '../styles/Card.css';

function Foods(props) {
  const getByName = MealsAPI.default;
  const [firstFoods, setFirstFoods] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const { foods } = props;
  React.useEffect(() => {
    getByName()
      .then(setFirstFoods)
      .then(() => setLoading(!loading));
  }, []);

  return loading ? <div>Loading...</div> : (
    <div className="foodScreen">
      <HeadBar title="Comidas" />

      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary">Left</button>
        <button type="button" className="btn btn-secondary">Middle</button>
        <button type="button" className="btn btn-secondary">Right</button>
        <button type="button" className="btn btn-secondary">Middle</button>
        <button type="button" className="btn btn-secondary">Right</button>
      </div>

      <div className="items-list">
        {setList(foods, firstFoods).map((food, index) => (
          <Card key={ index } index={ index } item={ food } type="meal" />
        ))}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  foods: state.foods.list,
});

Foods.propTypes = PropTypes.instanceOf(Array).isRequired;
export default connect(mapStateToProps)(Foods);
