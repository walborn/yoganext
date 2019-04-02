import React from 'react'
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import masters from './db';
import { color, shadow } from '../../static/styles/constants';


class Master extends React.PureComponent {
    render() {
        const master = masters.find(i => i.id === this.props.router.query.title);
        return (
            <Layout>
                <div className="avatar">
                    <img src={`/static/images/avatar/${master.name}.png`} alt={master.name} />
                </div>
                <div className="name">{master.name}</div>
                <div className="description">{master.description}</div>
                <style jsx>
                    {`
.name {
    font-size: 28px;
    padding-bottom: 10px;
    color: ${color.orange};
    text-align: center;
}
.avatar {
    text-align: center;
}
.avatar > img {
    width: 100%;
    max-width: 200px;
    border-radius: 50%;
    box-shadow: ${shadow.plane};
}
`
                    }
                </style>
            </Layout>
        );
    }
}

export default withRouter(Master);
