import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
// import { createBrowserHistory } from 'history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // const history = createBrowserHistory();
  const history = useHistory();

  // type UserResponse = {
  //   'data': {
  //     'accessToken': string | undefined;
  //   };
  // };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function handleLogin() {
    const { data }  = await api.post('api/v1/authentication', {
      'userName': 'xbrown@gmail.com',
      'password': '@dminGBC'
    });

    localStorage.setItem('token', JSON.stringify(data?.data.accessToken));
    api.defaults.headers.Authorization = `Bearer ${data?.data.accessToken}`;

    setAuthenticated(true);
    history.push('/users');
  }

  async function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }
  
  return { authenticated, loading, handleLogin, handleLogout };
}
