import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

import '../styles/home.scss';

export default function Home() {

  const { theme } = useTheme();

  const [click, setClick] = useState(false);

  return (
    <div id='page-home' className={theme}>
      <header className="header">
        <nav className="navbar">
            <Link to="/home" className="nav-logo">WebDev.</Link>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link to="/users" className="nav-link">Clientes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Blog</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Contact</Link>
                </li>
            </ul>
            <div className="hamburger" onClick={() => setClick(!click)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
      </header>
      <main className={theme}>
        <h1>Most Popular Browsers</h1>
        <p>Chrome, Firefox, and Edge are the most used browsers today.</p>

        <article>
          <h2>Google Chrome</h2>
          <p>Google Chrome is a web browser developed by Google, released in 2008. Chrome is the world's most popular web browser today!</p>
        </article>

        <article>
          <h2>Mozilla Firefox</h2>
          <p>Mozilla Firefox is an open-source web browser developed by Mozilla. Firefox has been the second most popular web browser since January, 2018.</p>
        </article>

        <article>
          <h2>Microsoft Edge</h2>
          <p>Microsoft Edge is a web browser developed by Microsoft, released in 2015. Microsoft Edge replaced Internet Explorer.</p>
        </article>
      </main>
      <footer>
        <p>Author: Charles Barbosa</p>
        <p><a href="mailto:xbrown@gmail.com">xbrown@gmail.com</a></p>
        <p>https://dev.to/devggaurav/let-s-build-a-responsive-navbar-and-hamburger-menu-using-html-css-and-javascript-4gci</p>
      </footer>
    </div>
  );
}
