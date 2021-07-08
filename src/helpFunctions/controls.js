import React from 'react';
import ButtonIcon from '../components/ButtonIcon';

function generateBtn(btnProps) {
  return (
    <>
      {btnProps.map(({ imgSrc, imgAlt, btnFn, testid }) => (
        <ButtonIcon
          key={ imgAlt }
          imgSrc={ imgSrc }
          imgAlt={ imgAlt }
          testid={ testid }
          btnFn={ btnFn }
        />
      ))}
    </>
  );
}

export default generateBtn;
