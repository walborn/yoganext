import React from 'react';
import Head from './Head'
import Navigation from './Navigation'
import Footer from './Footer';
import './layout.scss';

export default props => (
    <div id="application">
        <Head />
        <Navigation />
        <main className="row">
            {props.children}
        </main>
        <Footer />
    </div>
)
