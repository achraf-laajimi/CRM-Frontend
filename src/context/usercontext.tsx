// src/context/UserContext.tsx
import React, { createContext, useContext, Dispatch, SetStateAction } from 'react';

// Définir le type des données du contexte
interface UserContextType {
  user: any; // Remplacez 'any' par le type approprié pour 'user'
  setUser: Dispatch<SetStateAction<any>>; // Remplacez 'any' par le type approprié pour 'user'
}

// Créer le contexte avec une valeur par défaut (null dans ce cas)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
