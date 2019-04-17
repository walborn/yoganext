import Layout from '../components/Layout'
import Unlimited from '../components/Unlimited/index';

export default () => (
    <Layout>
        <div className="home">
            <h1><img className="brand" src="/static/images/brand.png" alt="Йога клуб ОМ" /></h1>
            <p><strong>Клуб ОМ</strong> - это сообщество увлеченных людей, целью которых является саморазвитие и помощь в
                этом другим людям. Мы всегда открыты для нового, но при этом бережно чтим древние традиции.</p>

            <h2>Выбери свою практику</h2>
            <div>
                С нами ты найдёшь именно ту практику, которая лучше всего будет подходить твоему уровню и твоим устремлениям.
                Это не только физическое развитие, но умение управлять своим умом и психофизическим состоянием!
                У нас тренируют только самые опытные и сертифицированные инструкторы, которые являются сами серьезными практиками своего направления.
                Ты можешь выбрать как заниматься - <strong>индивидуально</strong> с преподавателем или вместе <strong>с группой</strong>.
                Это не имеет значения! Имеет значение только твоя практика!
            </div>
            <p><strong>ЙОГА:</strong>
                <div className="home__item">Аштанга йога</div>
                <div className="home__item">Кундалини йога</div>
                <div className="home__item">Классическая Хатха йога</div>
                <div className="home__item">Мягкие практики <strong>для беременных</strong></div>
            </p>

            <p><strong>СПЕЦИАЛЬНЫЕ НАПРАВЛЕНИЯ:</strong>
                <div className="home__item">Восстановление после родов</div>
                <div className="home__item">Практика "Здоровая спина"</div>
                <div className="home__item">Общая физическая подготовка</div>
            </p>
            <p><strong>ТАНЦЫ:</strong>
                <div className="home__item">Восточные танцы: грация, пластика, женское здоровье и прекрасное настроение!</div>
            </p>
            <p><strong>ЕДИНОБОРСТВА (ДЛЯ ДЕТЕЙ ОТ 5 ДО 16 ЛЕТ)</strong>
                <div className="home__item">Джит Кун-до - стиль, основанный Брюсом Ли</div>
            </p>


            <h2>Безлимитная неделя!</h2>
            <p><Unlimited /></p>
        </div>
        <style jsx>
            {
`
.brand {
    width: 100%;
    max-width: 300px;
}
.home:before {
    content: '';
    position:absolute;
    top: 20px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    opacity: 0.03;
    background: url(/static/images/logo.png) no-repeat 50% 50%;
    background-size: cover;
}
.home__item {
    position: relative;
    padding-left: 30px;
}
.home__item:before {
    content: '';
    position:absolute;
    top: 5px;
    left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: orange;
}
.hint {
    color: #95a3b4;
    padding: 10px
}
`
            }
        </style>
    </Layout>
)
