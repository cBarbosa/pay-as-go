import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BottonNav } from '../components/BottonNav';
import { HeaderNav } from '../components/HeaderNav';
import { ListContractsNav } from '../components/ListContractsNav';
import { useTheme } from '../hooks/useTheme';

import '../styles/list-contracts.scss';

import imgPlus from '../assets/images/plus-solid.svg';

type RoomParams = {
  id: string;
};

export default function ListContracts() {
  const { theme } = useTheme();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const personId = params.id;

  return (
    <div id="page-list-contract" className={theme}>
      <HeaderNav />
      <main className={theme}>
        <div className="content">
          <h2>Lista de contratos</h2>
          <h3>Nome do Titular</h3>
          <span>00000000000</span>
          <button>
            <img src={imgPlus} alt='' onClick={_ => history.push('/contract-add')}/>
          </button>

          <ListContractsNav personId={personId} />

        </div>
      </main>
      <BottonNav />
    </div>
  );
}
