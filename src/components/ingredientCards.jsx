import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/cards.css';

class IngredientCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      id: '',
      isRedirect: false,
    };
    this.updateState = this.updateState.bind(this);
    this.handleApi = this.handleApi.bind(this);
  }

  componentWillUnmount() {
    console.log('a');
    this.setState({ id: undefined });
    this.setState({ isRedirect: false });
  }

  async handleApi() {
    const { details, title } = this.props;

    await details(title);
    console.log('bah');
    return this.setState({ type: 'fetching', id: 'should' });
  }

  updateState() {
    const { item } = this.props;
    const { id } = this.state;
    // console.log(item, 'updateState');
    console.log(item.length);
    console.log(id);
    console.log(id.length);
    if (item.length !== 0 && id.length !== 0) {
      console.log('pão');
      return this.setState({ isRedirect: true });
    }
  }

  render() {
    const { img, title, index, url } = this.props;
    const { isRedirect, type } = this.state;
    return (
      <div>
        <Card
          data-testid={ `${index}-ingredient-card` }
          onClick={ this.handleApi }
        >

          <Card.Img
            variant="top"
            src={ img }
            data-testid={ `${index}-card-img` }
          />
          <Card.Body>
            <Card.Title data-testid={ `${index}-card-name` }>{ title }</Card.Title>
          </Card.Body>
        </Card>
        { type !== undefined && this.updateState()}
        { isRedirect && <Redirect to={ url } />}
      </div>
    );
  }
}

IngredientCards.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  details: PropTypes.func.isRequired,
  item: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default IngredientCards;
