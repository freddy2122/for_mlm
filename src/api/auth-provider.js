// auth.js

import Cookies from 'js-cookie';

export const setAuthToken = (token) => {
  Cookies.set('authTokenForMLM', token, { expires: 7 });
};

export const getAuthToken = () => {
  return Cookies.get('authTokenForMLM');
};

export const removeAuthToken = () => {
  Cookies.remove('authTokenForMLM');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
