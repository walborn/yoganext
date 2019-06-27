import React from 'react';
import Layout from '../components/Layout/index';
import Slider from '../components/Slider/index';
import css from '../styles/rent.styl';


export default () => (
    <Layout>
        <div className={css.rent}>
            <div className={css.thesis}>Наши залы</div> - это многофункциональные площадки, которые подойдут для различных занятий и мероприятий.
            Они находятся внутри многоэтажного делового комплекса. Залы предназначены для проведения
            индивидуальных и групповых занятий, а также тренингов по следующим направлениям:
            <div className={css.list}>
                <div className={css.item}>Йога</div>
                <div className={css.item}>Танцы</div>
                <div className={css.item}>Фитнес</div>
            </div>
            <h2>Характеристики</h2>
            <div>
                <div className={css.item}>Площадь залов: 40 и 50 м2</div>
                <div className={css.item}>Высота потолков: 4 м</div>
                <div className={css.item}>Зеркала на стенах</div>
                <div className={css.item}>Напольное покрытие: линолеум</div>
                <div className={css.item}>Раздевалки (женская, мужская)</div>
                <div className={css.item}>Спортинвентарь: коврики, блоки, ремни для йоги</div>
            </div>
            <div className={css.thesis}>Цена:</div> от 500 руб./час
            <div className={css.images}>
                <Slider
                    list={[
                        '/static/images/gallery/3.jpg',
                        '/static/images/gallery/4.jpg',
                        '/static/images/gallery/5.jpg',
                        '/static/images/gallery/6.jpg',
                        '/static/images/gallery/1.jpg',
                    ]}
                />
            </div>
            <div className={css.images}>
                <img src="/static/images/gallery/Plan_OM.jpg" />
            </div>
        </div>
    </Layout>
);

