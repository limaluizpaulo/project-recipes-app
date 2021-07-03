import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../Components/Footer';
import HeadBar from '../Components/HeadBar';
import Card from '../Components/Card';
import '../styles/Card.css';

function Foods(props) {
  const { foods } = props;
  const twelveItems = 12;
  const foodsCopy = [...foods];
  const foodsList = foodsCopy.splice(0, twelveItems);

  return (
    <div className="foodScreen">
      <HeadBar title="Comidas" />
      <div className="items-list">
        {foodsList.map((food, index) => (
          <Card key={ index } item={ food } />
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
