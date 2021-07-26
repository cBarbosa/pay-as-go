import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { HeaderNav } from '../components/HeaderNav';
import { BottonNav } from '../components/BottonNav';
import { SearchPerson } from '../components/SearchPerson';

import '../styles/users.scss';

export default function Users() {

  const { theme } = useTheme();

  return (
    <div id='page-users' className={theme}>
    <HeaderNav />
    <main className={theme}>
      <div className="content">
        <h2>Consultas cliente</h2>
        <SearchPerson />
      </div>
    </main>
    <BottonNav />
  </div>
  );
}
