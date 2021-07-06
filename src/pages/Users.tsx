import React, { useState, useEffect } from 'react';
import { Person } from '../models/Person';
import api from '../services/api';

export default function Users() {
  
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/api/v1/person?name=cliente');

      setPersons(data.data);
    })();
  }, []);

  return (
      <ul>
        {persons.map((person) => (
          <li key={person.recordId}>{person.name} ({person.email})</li>
        ))}
      </ul>
  );
}
