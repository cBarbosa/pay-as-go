import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export function BottonNav() {
    
    return(
        <footer>
        <p>Author: Charles Barbosa</p>
        <p><Link to="mailto:xbrown@gmail.com">xbrown@gmail.com</Link></p>
        <p>https://dev.to/devggaurav/let-s-build-a-responsive-navbar-and-hamburger-menu-using-html-css-and-javascript-4gci</p>
      </footer>
    );
}
