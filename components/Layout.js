import Head from './Head'
import Navigation from './Navigation'
import React from 'react';
import './layout.scss';

export default props => (
    <div>
        <Head />
        <Navigation />
        {props.children}
    </div>
)
