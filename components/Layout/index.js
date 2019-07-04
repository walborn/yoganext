import React from 'react';
import PropTypes from 'prop-types';
import NextSeo from 'next-seo';
import { YMInitializer } from 'react-yandex-metrika';
import { initGA, logPageView } from '../../utils/analytics';
import Head from '../Head';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Row from '../Row';
import css from './styles.styl';

const ROOT_URL = 'https://yoga-club-om.ru';

export default class Layout extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
        keywords: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        ogTitle: PropTypes.string,
        ogDescription: PropTypes.string,
    };

    static defaultProps = {
        title: '',
        description: '',
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
        const { keywords, title, description, ogTitle, ogDescription } = this.props;
        return (
            <div id={css.application}>
                <Head keywords={keywords} />
                <NextSeo
                    config={{
                        title,
                        titleTemplate: '%s / Йога клуб ОМ',
                        description,
                        canonical: ROOT_URL,
                        openGraph: {
                            url: ROOT_URL,
                            title: ogTitle || title,
                            description: ogDescription || description,
                            images: [ { url: `${ROOT_URL}/static/favicon.png`, alt: ogTitle || title } ],
                            defaultImageHeight: 630,
                            defaultImageWidth: 1200,
                            site_name: 'Йога клуб ОМ',
                        },
                    }}
                />
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
