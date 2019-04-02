import React from 'react';
import Link from 'next/link'
import Layout from '../../components/Layout';
import masters from './db';
import { color, shadow } from '../../static/styles/constants';


const MasterLink = master => (
    <div>
        <Link as={`/master/${master.id}`} href={`/master/item?title=${master.id}`}>
            <div className="item">
                <div className="avatar">
                    <img src={`/static/images/avatar/${master.name}.png`} alt={master.name} />
                </div>
                <div className="name">{master.name}</div>
                <div className="description">{master.description}</div>
            </div>
        </Link>
        <style jsx>
            {`
.item {
    margin: 10px 0;
    padding: 20px;
    text-align: center;
    box-sizing: border-box;
    box-shadow: ${shadow.plane};
    border-radius: 6px;
    cursor: pointer;
}
.item:hover {
    box-shadow: ${shadow.hover};
}
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
    </div>
);

export default () => (
    <Layout>
        {
            masters.map(i => <MasterLink key={i.id} {...i} />)
        }
    </Layout>
)

