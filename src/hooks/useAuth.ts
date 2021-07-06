import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  async function handleLogin(username:string, password: string)  {

    if(!username || !password)
      throw Error('Não autenticado');

    try {
      const { data: { data: { accessToken } } }  = await api.post('api/v1/authentication', {
        'userName': username,
        'password': password
      });

      localStorage.setItem('token', JSON.stringify(accessToken));
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;

      setAuthenticated(true);
      history.push('/home');

    } catch (error) {
      throw Error(error);
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }

  return { authenticated, loading, handleLogin, handleLogout };
}
