import React, { createContext, ReactNode } from 'react';

import useAuth from '../hooks/useAuth';

type AuthContextType = {
  loading: boolean;
  authenticated: boolean;
  handleLogin: (username:string, password:string) => Promise<void>;
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
