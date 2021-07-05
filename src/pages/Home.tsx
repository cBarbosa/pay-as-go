import React, { FormEvent, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { HeaderNav } from '../components/HeaderNav';
import { BottonNav } from '../components/BottonNav';

import '../styles/home.scss';
import { Button } from '../components/Button';
// import serachIcon from '../assets/images/icons8-search.svg';
import { User } from '../models/User';
import { getByDocumentOrName } from '../services/UserService';

export default function Home() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const data = await get(name, '');

  //     setUsers(data);
  //   })();
  // }, [name]);

  async function handleSubmitSearch(event: FormEvent) {
    event.preventDefault();
    const result = await getByDocumentOrName(name, '');
    if(result.length === 0)
      setUsers([]);
    setUsers(result);
  }

  return (
    <div id='page-home' className={theme}>
      <HeaderNav />
      <main className={theme}>
        <div className="content">
          <h2>Consultas</h2>
          
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
          <div className="separator">Resultado - { users.length } registros</div>

          <div className="list-person">

            {users.map(user => {
              return (
                <div key={user.recordId} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <div>
                    <p>{user.document}</p>
                    <span>{user.phone}</span>
                  </div>
                  <div>
                    <Button>Novo contrato</Button>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </main>
      <BottonNav />
    </div>
  );
}
