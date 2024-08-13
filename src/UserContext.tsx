// UserContext.tsx
import React, { createContext, ReactNode, useState } from 'react';
import { User, UserContextType } from './UserContextType';

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({  }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <UserContext.Provider value={{ user }}>
            
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
