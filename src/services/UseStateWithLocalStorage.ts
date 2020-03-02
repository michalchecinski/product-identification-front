import React from 'react';
import { State } from '../models/State';

export const UseStateWithLocalStorage = (localStorageKey: string): [string, React.Dispatch<React.SetStateAction<string>>] => {
    const [value, setValue] = React.useState(
      localStorage.getItem(localStorageKey) || null
    );
    React.useEffect(() => {
      localStorage.setItem(localStorageKey, value);
    }, [value]);
    return [value, setValue];
  };