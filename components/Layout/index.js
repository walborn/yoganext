import React from 'react';
import PropTypes from 'prop-types';
import { YMInitializer } from 'react-yandex-metrika';
import { initGA, logPageView } from '../../utils/analytics';
import Head from '../Head';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Row from '../Row';
import css from './styles.styl';


export default class Layout extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true;
        }
        logPageView();
    }

    render() {
        return (
            <div id={css.application}>
                <Head />
                <Navigation />
                <main>
                    <Row>
                        {this.props.children}
                    </Row>
                </main>
                <Footer />
                <YMInitializer
                    accounts={[ 53836567 ]}
                    options={{
                        webvisor: true,
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                    }}
                />
            </div>
        );
    }
}
