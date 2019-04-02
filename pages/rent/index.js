import Layout from '../../components/Layout'

export default () => (
    <Layout>
        <h1 className="rent__header">Описание залов</h1>
        Наши залы - это многофункциональные площадки, которые подойдут для различных занятий и мероприятий.
        Они находятся внутри многоэтажного делового комплекса. Залы предназначены для проведения
        индивидуальных и групповых занятий, а также тренингов по следующим направлениям:
        <ul className="rent__list">
            <li>Йога,</li>
            <li>Танцы,</li>
            <li>Фитнес.</li>
        </ul>
        <div className="rent__sub-header">Характеристики:</div>
        <ul>
            <li>Площадь залов: 40 и 50 м2</li>
            <li>Высота потолков: 4 м</li>
            <li>Зеркала на стенах</li>
            <li>Напольное покрытие: линолеум</li>
            <li>Раздевалки (женская, мужская)</li>
            <li>Спортинвентарь: коврики, блоки, ремни для йоги</li>
        </ul>
        <div className="rent__sub-header">Цена:</div> от 500 руб./час
        <div className="rent__images">
            <img src="/static/images/rent/0.jpg" />
            <img src="/static/images/rent/1.jpg" />
            <img src="/static/images/rent/2.jpg" />
            <img src="/static/images/rent/3.jpg" />
            <img src="/static/images/rent/4.jpg" />
        </div>
    </Layout>
)
