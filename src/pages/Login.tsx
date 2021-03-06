import React, { FormEvent, useState } from 'react';

import { Button } from '../components/Button';
import { useTheme } from '../hooks/useTheme';
import useAuth from '../hooks/useAuth';

import illustrationImg from '../assets/images/gym-logo.svg';
import logoImg from '../assets/images/red-shield-full.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export default function Login() {
  const { authenticated, handleLogin } = useAuth();
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.debug('Login', authenticated);

  async function handlePostLogin(event:FormEvent) {
    event.preventDefault();
    
    await handleLogin(username, password);
  }

  return (
    <div id='page-auth' className={theme}>
      <aside className={theme}>
        <img src={illustrationImg} alt="Ilustração simbolizando GB" />
        <strong>GYM Manager</strong>
        <p>Gestor da academia Gracie Barra Ceilândia</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Gym" />
          <button className="create-room" disabled={true}>
            <img src={googleIconImg} alt="Logo do Google" />
            Entre com Google
          </button>
          <div className='separator'>ou entre com email</div>
          <form action="" onSubmit={ handlePostLogin }>
            <input
              type="email"
              placeholder="Digite o email para acesso"
              onChange={ event => setUsername(event.target.value) }
              value={username}
              maxLength={100}
            />

            <input
              type="password"
              placeholder="Digite a senha para acesso"
              onChange={ event => setPassword(event.target.value) }
              value={password}
              maxLength={20}
            />

            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
