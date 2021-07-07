import { useState, useEffect } from 'react';

const useLocalStorage = (key, inicial) => {
  const [state, setState] = useState(() => {
    const local = JSON.parse(window.localStorage.getItem(key));
    return local || inicial;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorage;
