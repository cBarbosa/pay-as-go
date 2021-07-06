import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { HeaderNav } from '../components/HeaderNav';
import { BottonNav } from '../components/BottonNav';
import { SearchPerson } from '../components/SearchPerson';

import '../styles/home.scss';

export default function Home() {
  const { theme } = useTheme();

  return (
    <div id='page-home' className={theme}>
      <HeaderNav />
      <main className={theme}>
        <div className="content">
          <h2>Consultas</h2>
          <SearchPerson />
        </div>
      </main>
      <BottonNav />
    </div>
  );
}
