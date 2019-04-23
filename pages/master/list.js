import React from 'react';
import Link from 'next/link'
import Layout from '../../components/Layout/index';
import masters from './db';
import css from './list.styl';


export default () => (
    <Layout>
        {
            masters.map(i => (
                <div key={i.id}>
                    {/*<Link as={`/master/${i.id}`} href={`/master/item?title=${i.id}`}>*/}
                        <div className={css.item}>
                            <div className={css.avatar}>
                                <img src={`/static/images/avatar/${i.name}.png`} alt={i.name} />
                            </div>
                            <div className={css.name}>{i.name}</div>
                            <div className={css.description}>{i.description}</div>
                        </div>
                    {/*</Link>*/}
                </div>
            ))
        }
    </Layout>
)

