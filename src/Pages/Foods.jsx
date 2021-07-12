/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import HeadBar from '../Components/HeadBar';
import CategoryButtons from '../Components/CategoryButtons';
import MealsAPI from '../services/MealRecipesAPI';
import { setList } from '../services/services';
import '../styles/Card.css';

function Foods(props) {
  const { getByDefault, getByCategory } = MealsAPI;

  const [mainFoods, setMainFoods] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { foods } = props;

  React.useEffect(() => {
    getByCategory()
      .then(setCategories)
      .then(() => setLoading(false));

    if (!foods.length) {
      getByDefault()
        .then((res) => setMainFoods(setList(res)));
    }
  }, []);

  React.useEffect(() => {
    if (foods.length) {
      setMainFoods(setList(foods));
    }
  }, [foods]);

  return loading ? <div>Loading...</div> : (
    <div className="tela-food">
      <HeadBar title="Comidas" />
      <CategoryButtons
        setMainFoods={ (list) => setMainFoods(setList(list)) }
        type="meal"
        categories={ categories.map((category) => category.strCategory) }
      />

      <div className="items-list">
        {mainFoods.map((food, index) => (
          <Card title="comidas" key={ index } index={ index } item={ food } type="meal" />
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
