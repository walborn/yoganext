import Layout from '../components/Layout/index'
import Unlimited from '../components/Unlimited/index';
import css from '../static/styles/pages/index.styl';

export default () => (
    <Layout>
        <div className={css.home}>
            <h1><img className={css.brand} src="/static/images/brand.png" alt="Йога клуб ОМ" /></h1>
            <section><strong>Клуб ОМ</strong> - это сообщество увлеченных людей, целью которых является саморазвитие и помощь в
                этом другим людям. Мы всегда открыты для нового, но при этом бережно чтим древние традиции.</section>

            <h2>Выбери свою практику</h2>
            <section>
                С нами ты найдёшь именно ту практику, которая лучше всех подойдет твоему уровню и твоим устремлениям.
                Это не только физическое развитие, но глубокое управление своим умом и психофизическим состоянием!
                У нас тренируют только самые опытные и сертифицированные инструкторы, которые являются сами серьезными практиками своего направления.
                Ты можешь выбрать как заниматься - <strong>индивидуально</strong> с преподавателем или вместе <strong>с группой</strong>.
                Это не имеет значения! Имеет значение только твоя практика!
            </section>
            <section><strong>ЙОГА:</strong>
                <div className={css.item}>Аштанга йога</div>
                <div className={css.item}>Кундалини йога</div>
                <div className={css.item}>Классическая Хатха йога</div>
                <div className={css.item}>Мягкие практики <strong>для беременных</strong></div>
            </section>

            <section><strong>СПЕЦИАЛЬНЫЕ НАПРАВЛЕНИЯ:</strong>
                <div className={css.item}>Восстановление после родов</div>
                <div className={css.item}>Практика "Здоровая спина"</div>
                <div className={css.item}>Общая физическая подготовка</div>
            </section>
            <section><strong>ТАНЦЫ:</strong>
                <div className={css.item}>Восточные танцы - это грация, пластика, женское здоровье и прекрасное настроение!</div>
            </section>
            <section><strong>ЕДИНОБОРСТВА (ДЛЯ ДЕТЕЙ ОТ 5 ДО 16 ЛЕТ)</strong>
                <div className={css.item}>Джит Кун-до - стиль, основанный Брюсом Ли</div>
            </section>


            <h2>Безлимитная неделя!</h2>
            <section><Unlimited /></section>
        </div>
    </Layout>
)
