/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeadBar from '../Components/HeadBar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import CategoryButtons from '../Components/CategoryButtons';
import BeverageAPI from '../services/BeverageRecipesAPI';
import setList from '../services/services';
import '../styles/Card.css';

function Drinks(props) {
  const { drinks } = props;
  const { getByDefault, getByCategory } = BeverageAPI;
  const [firstDrinks, setFirstDrinks] = React.useState();
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getByCategory()
      .then(setCategories)
      .then(() => (
        getByDefault()
          .then(setFirstDrinks)
          .then(() => setLoading(!loading))
      ));
  }, []);
  return loading ? <div>Loading...</div> : (
    <div className="foodScreen">
      <HeadBar title="Bebidas" />
      <CategoryButtons
        categories={ categories.map((category) => category.strCategory) }
      />
      <div className="items-list">
        {setList(drinks, firstDrinks).map((drink, index) => (
          <Card key={ index } index={ index } item={ drink } />
        ))}
      </div>
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => ({
  drinks: state.drinks.list,
});

Drinks.propTypes = PropTypes.shape({}).isRequired;
export default connect(mapStateToProps)(Drinks);
