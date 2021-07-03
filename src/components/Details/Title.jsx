import React from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function Title({ title, subtitle }) {
  return (
    <Container>
      <section>
        <strong data-testid="recipe-title">{ title }</strong>
      </section>
      <section>
        <i data-testid="recipe-category">{ subtitle }</i>
      </section>
      <section>
        <Button data-testid="share-btn" variant="primary">
          <Image src={ shareIcon } />
        </Button>
        <Button data-testid="favorite-btn" variant="success">
          <Image src={ whiteHeartIcon } />
        </Button>
      </section>
      <br />
    </Container>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}.isRequired;
