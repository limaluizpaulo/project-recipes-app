/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import HeadBar from '../Components/HeadBar';
import CategoryButtons from '../Components/CategoryButtons';
import MealsAPI from '../services/MealRecipesAPI';
import setList from '../services/services';
import '../styles/Card.css';

function Foods(props) {
  const { getByDefault, getByCategory } = MealsAPI;

  const [firstFoods, setFirstFoods] = React.useState();
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { foods } = props;
  React.useEffect(() => {
    getByCategory()
      .then((res) => setCategories(res))
      .then(() => (
        getByDefault()
          .then(setFirstFoods)
          .then(() => setLoading(!loading))
      ));
  }, []);

  return loading ? <div>Loading...</div> : (
    <div>
      <HeadBar title="Comidas" />
      <CategoryButtons
        categories={ categories.map((category) => category.strCategory) }
      />

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
