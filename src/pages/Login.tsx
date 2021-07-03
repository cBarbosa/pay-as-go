import React, { FormEvent, useState } from 'react';

import { Button } from '../components/Button';
import { useTheme } from '../hooks/useTheme';
import useAuth from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
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
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" >
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form action="" onSubmit={ handlePostLogin }>
            <input
              type="email"
              placeholder="Digite o email do usuário"
              onChange={ event => setUsername(event.target.value) }
              value={username}
            />

            <input
              type="password"
              placeholder="Digite a senha"
              onChange={ event => setPassword(event.target.value) }
              value={password}
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
