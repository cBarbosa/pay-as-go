import React, { useState, useEffect, useContext } from 'react';

import api from '../services/api';
import { Context } from '../contexts/AuthContext';

type User = {
    recordId: string;
    document: string;
    name: string;
    birthDate: string;
    gender: string;
    genderTitle: string;
    email: string;
    phone: string;
    zipcode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    federativeUnit: string;
    complement: string;
    profile: string;
    profileTitle: string;
    avatar: string;
  };

export default function Users() {
  const { handleLogout } = useContext(Context);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/api/v1/person?name=cliente');

      setUsers(data.data);
    })();
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.recordId}>{user.name} ({user.email})</li>
        ))}
      </ul>

      <button type="button" onClick={handleLogout}>Sair</button>
    </>
  );
}
