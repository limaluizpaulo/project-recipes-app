import React, { useRef, useState } from 'react';
import PropTypes, { shape } from 'prop-types';
import copy from 'clipboard-copy';
import { Overlay, Tooltip, Card, Button } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';

export default function ButtonCompartilhar({ parametrosURL: { id, type }, dataTestId }) {
  const typeURL = 'comidas'.includes(type) ? 'comidas' : 'bebidas';
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const handleClick = () => {
    const doisSegundos = 2000;
    setShow(true);
    copy(`http://localhost:3000/${typeURL}/${id}`);
    const removeTooltip = setTimeout(() => {
      setShow(false);
      clearTimeout(removeTooltip);
    }, doisSegundos);
  };

  return (
    <>
      <Button
        ref={ target }
        variant="ligth"
        onClick={ handleClick }
      >
        <Card.Img
          data-testid={ dataTestId }
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
  parametrosURL: shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  dataTestId: PropTypes.string.isRequired,
};
