import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import CarouselCards from './CarouselCards';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class CardsMeals extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    const { meals } = this.props;
    const max = 6;
    const sliceMeals = meals.slice(0, max);
    return (
      <section>
        <Slider { ...settings }>
          {
            sliceMeals.map((measl, index) => (
              <CarouselCards
                url="/comidas"
                id={ measl.idMeal }
                key={ measl.idMeal }
                img={ measl.strMealThumb }
                title={ measl.strMeal }
                index={ index }
                subTitle={ measl.strCategory }
              />
            ))
          }
        </Slider>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.foodCategories.meals,
});

CardsMeals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(CardsMeals);
