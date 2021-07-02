import React, { createContext, ReactNode } from 'react';

import useAuth from '../hooks/useAuth';

// type User = {
//   id: string;
//   name: string;
//   avatar: string;
// };

type AuthContextType = {
  // user: User | undefined;
  loading: boolean;
  authenticated: boolean;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const Context = createContext({} as AuthContextType);

function AuthProvider(props: AuthContextProviderProps) {
  const {
    authenticated, loading, handleLogin, handleLogout,
  } = useAuth();

  return (
    <Context.Provider value={{ loading, authenticated, handleLogin, handleLogout }}>
      { props.children }
    </Context.Provider>
  );
}

export { Context, AuthProvider };
