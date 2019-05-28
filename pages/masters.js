import React from 'react';
import Layout from '../components/Layout/index';
import masters from '../static/masters';
import css from '../styles/masters.styl';


export default () => (
    <Layout>
        {
            masters.map(i => (
                <div key={i.id}>
                    <div className={css.item}>
                        <div className={css.avatar}>
                            <img src={`/static/images/avatar/${i.name}.png`} alt={i.name} />
                        </div>
                        <div className={css.name}>{i.name}</div>
                        <div className={css.description}>{i.description}</div>
                    </div>
                </div>
            ))
        }
    </Layout>
);
