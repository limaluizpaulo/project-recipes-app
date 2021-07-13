import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import CarouselCards from './CarouselCards';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class CardsDrinks extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    const { drinks } = this.props;
    const max = 6;
    const sliceDrinks = drinks.slice(0, max);
    return (
      <section>
        <Slider { ...settings }>
          {
            sliceDrinks.map((drink, index) => (
              <div key={ index }>
                <CarouselCards
                  url="/bebidas"
                  id={ drink.idDrink }
                  key={ index }
                  img={ drink.strDrinkThumb }
                  title={ drink.strDrink }
                  index={ index }
                  subTitle={ drink.strAlcoholic }
                />
              </div>
            ))
          }
        </Slider>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  drinks: state.drinkCategories.drinks,
});

CardsDrinks.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(CardsDrinks);
