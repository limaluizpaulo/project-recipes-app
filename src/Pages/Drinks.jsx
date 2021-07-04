import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeadBar from '../Components/HeadBar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import '../styles/Card.css';

function Drinks(props) {
  const { drinks } = props;
  const twelveItems = 12;
  const list = drinks || [];
  const drinksCopy = [...list];
  const drinksList = drinksCopy.splice(0, twelveItems);
  return (
    <div className="foodScreen">
      <HeadBar title="Bebidas" />
      <div className="items-list">
        {drinksList.map((drink, index) => (
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
