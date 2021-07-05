import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import './styles.scss';

export function HeaderNav() {

    const { handleLogout } = useAuth();
    const [click, setClick] = useState(false);
    // const history = useHistory();

    function handleDoLogout() {
        console.debug('handleDoLogout', 'passo 1');
        handleLogout();
    }
    
    return(
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
                        <span className="nav-link" onClick={handleDoLogout}>Sair</span>
                    </li>
                </ul>
                <div className="hamburger" onClick={() => setClick(!click)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>
    );
}
