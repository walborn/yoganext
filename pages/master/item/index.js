import React from 'react'
import { withRouter } from 'next/router';
import Markdown from 'react-markdown';
import Layout from '../../../components/Layout';
import masters from '../db';

class Master extends React.Component {
    render() {
        const master = masters.find(i => i.id === this.props.router.query.title);
        return (
            <Layout>
                <h1>{master.name}</h1>
                <div className="markdown">
                    <Markdown
                        source={master.description}
                    />
                </div>
                <style jsx global>
                    {
                        `.markdown {
    font-family: 'Arial';
}

.markdown a {
    text-decoration: none;
    color: blue;
}

.markdown a:hover {
    opacity: 0.6;
}

.markdown h3 {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
}`
                    }
                </style>
            </Layout>
        );
    }
}

export default withRouter(Master);
