import React, { useContext, useEffect } from 'react';

import UserContext from '../context/user.context';

function WarningMessage() {
  const { warningMessage, setWarningMessage } = useContext(UserContext);

  useEffect(() => {
    const TIME_LIMIT = 3000;
    setTimeout(() => {
      setWarningMessage('');
    }, TIME_LIMIT);
  }, [setWarningMessage]);

  return (
    <div className="warning-message">
      <span>{ warningMessage }</span>
    </div>
  );
}

export default WarningMessage;
