import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import exploreIcon from '../../images/exploreIcon.svg';

function Explore() {
  return (
    <Col className="center-footer-icons">
      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore icon" />
      </Link>
    </Col>
  );
}

export default Explore;
