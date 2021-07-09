import React, { useRef, useState } from 'react';
import PropTypes, { shape } from 'prop-types';
import copy from 'clipboard-copy';
import { Overlay, Tooltip, Card, Button } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';

export default function ButtonCompartilhar({ dados: { index, id, type } }) {
  const typeURL = type === 'comida' ? type : 'bebida';
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <Button
        ref={ target }
        variant="ligth"
        onClick={ () => {
          setShow(!show);
          copy(`http://localhost:3000/${typeURL}s/${id}`);
        } }
      >
        <Card.Img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
        />
      </Button>
      <Overlay
        target={ target.current }
        show={ show }
        placement="right"
      >
        {(props) => (
          <Tooltip
            id="mensagem"
            { ...props }
          >
            Link copiado!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

ButtonCompartilhar.propTypes = {
  dados: shape({
    index: PropTypes.number,
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};
