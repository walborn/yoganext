import Link from 'next/link'
import Layout from '../../../components/Layout';
import masters from '../db';
// import './styles.scss';



const MasterLink = master => (
    <div>
    <Link as={`/master/${master.id}`} href={`/master/item?title=${master.id}`}>
        <div className="master__item">
            <div className="master__avatar">
                <img src={`/static/images/avatar/${master.name}.png`} alt={master.name} />
            </div>
            <div className="master__name">{master.name}</div>
            <div className="master__description">{master.description}</div>
        </div>
    </Link>
        </div>
);

export default () => (
    <Layout>
        {
            masters.map(i => <li key={i.id}><MasterLink {...i} /></li>)
        }
    </Layout>
)

