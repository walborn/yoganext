import Layout from '../components/Layout'
import Unlimited from '../components/Unlimited/index';

export default () => (
    <Layout>
        <div className="home">
            <h1>КЛУБ ОМ - НАШ ДОМ</h1>
            <p><strong>Клуб ОМ</strong> - это сообщество увлеченных людей, целью которых является саморазвитие и помощь в
                этом другим людям. Мы всегда открыты для нового, но при этом бережно чтим древние традиции.</p>

            <h2>Практикуй и кот придет!</h2>
            <p><strong>ЙОГА:</strong> мускулистая и высокомерная Аштанга йога, мистическая Кундалини йога, классическая
                Хатха йога и мягкие практики для беременных. С нами вы найдете именно ту практику, которая принесет вам
                спокойствие ума и физическую крепость.</p>
            <p><strong>ВОСТОЧНЫЕ ТАНЦЫ:</strong> грация, пластика, женское здоровье и прекрасное настроение!</p>
            <p><strong>ДЛЯ ДЕТЕЙ</strong> от 5 до 16 лет у нас есть занятия по Джит Кун-до - стилю, основанному Брюс Ли.</p>

            <h2>Безлимитная неделя!</h2>
            <Unlimited />
        </div>
        <style jsx>
            {
`.home:before {
    content: '';
    position:absolute;
    top: 20px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    opacity: 0.03;
    background: url(/static/images/logo.png) no-repeat 50% 50%;
    background-size: cover;
}`
            }
        </style>
    </Layout>
)
