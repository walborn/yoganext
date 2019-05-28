import React from 'react';
import Head from '../Head';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Row from '../Row';
import css from './styles.styl';

export default props => (
    <div id={css.application}>
        <Head />
        <Navigation />
        <main>
            <Row>
                {props.children}
            </Row>
        </main>
        <Footer />
    </div>
);
