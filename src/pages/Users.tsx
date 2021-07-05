import React, { useState, useEffect } from 'react';
import { User } from '../models/User';
import api from '../services/api';

export default function Users() {
  
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/api/v1/person?name=cliente');

      setUsers(data.data);
    })();
  }, []);

  return (
      <ul>
        {users.map((user) => (
          <li key={user.recordId}>{user.name} ({user.email})</li>
        ))}
      </ul>
  );
}
