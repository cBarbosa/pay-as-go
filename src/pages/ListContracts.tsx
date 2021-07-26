import React from 'react';
import { useParams } from 'react-router-dom';
import { BottonNav } from '../components/BottonNav';
import { HeaderNav } from '../components/HeaderNav';
import { ListContractsNav } from '../components/ListContractsNav';
import { useTheme } from '../hooks/useTheme';

import '../styles/list-contracts.scss';

type RoomParams = {
  id: string;
};

export default function ListContracts() {
  const { theme } = useTheme();
  const params = useParams<RoomParams>();
  const personId = params.id;

  return (
    <div id="page-list-contract" className={theme}>
      <HeaderNav />
      <main className={theme}>
        <div className="content">
          <h2>Lista de contratos</h2>

          <ListContractsNav personId={personId} />

        </div>
      </main>
      <BottonNav />
    </div>
  );
}
