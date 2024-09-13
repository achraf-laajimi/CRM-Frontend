import Cookies from 'js-cookie';

// Fonction pour obtenir le token des cookies
export const getToken = (): string | undefined => {
  // Obtenez le token des cookies
  const token = Cookies.get('token');
  
  // Affichez le token pour vérifier
  console.log('Token:', token);
  
  // Retournez le token ou undefined si aucun token n'est trouvé
  return token;
};
