import { useEffect, useState } from 'react';

// *BASED ON* https://www.facebook.com/rocketseat/videos/2518026735178648/?extid=SEO----

const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      return JSON.parse([...storageValue, 'teste']);
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

// import useLocalStorage from '../hooks/useLocalStorage';
// const [teste, setTeste] = useLocalStorage('chave', 'default');

export default useLocalStorage;
