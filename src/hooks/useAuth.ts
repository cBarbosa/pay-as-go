import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

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
      toast.error('Não autenticou');

    try {
      const { data: { data: { accessToken } } }  = await api.post('api/v1/authentication', {
        'userName': username,
        'password': password
      });

      localStorage.setItem('token', JSON.stringify(accessToken));
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;

      setAuthenticated(true);
      history.replace('/home');

    } catch (error) {
      // throw Error(error);
      toast.error(error); 
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.replace('/login');
  }

  return { authenticated, loading, handleLogin, handleLogout };
}
