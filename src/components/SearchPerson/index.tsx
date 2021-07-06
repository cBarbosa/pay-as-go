import React, { FormEvent, useState } from 'react';
import { Person } from '../../models/Person';
import { getByDocumentOrName } from '../../services/UserService';
import { Button } from '../Button';

import './styles.scss';

export function SearchPerson() {

    const [name, setName] = useState('');
    const [persons, setPersons] = useState<Person[]>([]);

    async function handleSubmitSearch(event: FormEvent) {
      event.preventDefault();
      const result = await getByDocumentOrName(name, '');
      if(result.length === 0)
        setPersons([]);
      setPersons(result);
    }
    
    return (
        <>
          <div className="search-person">
            <form action="" onSubmit={handleSubmitSearch}>
              {/* <label>Pesquisa</label> */}
              <input
                type="text"
                placeholder="Entre com o nome do cliente"
                onChange={event => setName(event.target.value)}
                value={name}
              />
              <Button
                type="submit"
                isOutlined={true}
              >
                {/* <img src={serachIcon} alt="Logo search" /> */}
                Pesquisar
              </Button>
            </form>
          </div>
          <div className="separator">Resultado - { persons.length } registros</div>
            {persons.map(person => {
              return (
                <div className="list-person" key={person.recordId}>
                    <div className="user-card">
                      <div className="user-info">
                          <h3>{person.name}</h3>
                        <p>{person.email}</p>
                        <div>
                            <p>{person.document}</p>
                            <span>{person.phone}</span>
                        </div>
                      </div>
                    <div className="action">
                        <Button>Novo contrato</Button>
                        <Button>Novo contrato</Button>
                        <Button>Novo contrato</Button>
                    </div>
                    </div>
                </div>
              );
            })}
        </>
    );
}
