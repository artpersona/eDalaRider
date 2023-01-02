import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  storeLoggedUser,
  getLoggedUser,
  storeAuthToken,
  getAuthToken,
} from '../utils/storage.utility';

import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  //   States
  const [loggedUser, setLoggedUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // End States

  // Functions
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://192.168.1.26:8000/api/riderLogin', {
          email,
          password,
        })
        .then(data => {
          setLoggedUser(data.data.user);
          setToken(data.data.token);
          storeAuthToken(data.data.token);
          storeLoggedUser(data.data.user);
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err?.response);
        });
    });
  };

  const logout = () => {
    setLoggedUser(null);
    storeLoggedUser(null);
    setToken(null);
    storeAuthToken(null);
    setInitialized(false);
  };
  // End Functions

  // Use Effects
  useEffect(() => {
    async function getUser() {
      const user = await getLoggedUser();
      const token = await getAuthToken();
      if (user) {
        console.log('meron');
        setInitialized(true);
        setLoggedUser(user);
        setToken(token);
      }
    }
    getUser();
  }, []);

  const payload = {
    token,
    loggedUser,
    initialized,
    setLoggedUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider
      value={useMemo(() => payload, [loggedUser, initialized, token])}>
      {children}
    </AuthContext.Provider>
  );
};

export default React.memo(AuthProvider);
export const useAuthContext = () => useContext(AuthContext);
