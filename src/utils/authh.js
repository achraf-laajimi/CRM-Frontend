// utils/auth.js
import Cookies from 'js-cookie';

export const getToken = () => {
  const token = Cookies.get('token'); // Obtenez le token des cookies
  console.log('Token:', token); // Affichez le token pour vérifier
  return token;
};
