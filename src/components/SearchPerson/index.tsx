import React, { FormEvent, useState } from 'react';
import { Person } from '../../models/Person';
import { getByDocumentOrName } from '../../services/UserService';
import { Button } from '../Button';

import './styles.scss';
import imgIdCard from '../../assets/images/id-card-regular.svg';
import imgMobileAlt from '../../assets/images/mobile-alt-solid.svg';
import imgEnvelope from '../../assets/images/envelope-regular.svg';
import imgContract from '../../assets/images/file-alt-regular.svg';
import imgAddressCard from '../../assets/images/address-card-regular.svg';
import { useHistory } from 'react-router-dom';


export function SearchPerson() {
    const history = useHistory();
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
                        <p>
                          <img src={imgEnvelope} alt='Email de contato' />
                          {person.email}
                        </p>
                        <div>
                            <p>
                              <img src={imgIdCard} alt='CPF' />
                              {person.document}
                            </p>
                            <span>
                              <img src={imgMobileAlt} alt='Número de telefone' />
                              {person.phone}
                            </span>
                        </div>
                      </div>
                    <div className="action">
                        <button>
                          <img src={imgAddressCard} alt='Dados Cadastrais' />
                          Dados
                        </button>
                        <button onClick={() => history.push(`/contracts/${person.recordId}`)}>
                          <img src={imgContract} alt='Listar contratos' />
                          Contratos
                        </button>
                    </div>
                    </div>
                </div>
              );
            })}
        </>
    );
}
