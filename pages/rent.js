import React from 'react';
import Layout from '../components/Layout/index';
import Slider from '../components/Slider/index';
import css from '../styles/rent.styl';


export default () => (
    <Layout>
        <div className={css.rent}>
            <div className={css.thesis}>Наши залы</div> - это многофункциональные площадки, которые подойдут для различных занятий и мероприятий.
            Они находятся внутри многоэтажного делового комплекса. Залы предназначены для проведения
            индивидуальных и групповых занятий по следующим направлениям:

            <div className={css.list}>
                <div className={css.item}>Йога</div>
                <div className={css.item}>Фитнес</div>
                <div className={css.item}>Единоборства</div>
            </div>
            <h2>Характеристики</h2>
            <div>
                <div className={css.item}>Площадь залов: 70 и 15 м2</div>
                <div className={css.item}>Высота потолков: 3 м</div>
                <div className={css.item}>Напольное покрытие: линолеум (70 м2), ламинат (15 м2)</div>
                <div className={css.item}>Раздевалки (женская, мужская)</div>
                <div className={css.item}>Спортинвентарь: коврики, блоки, ремни для йоги, болстеры, татами</div>
            </div>
            <div className={css.images}>
                <Slider
                    list={[
                        '/static/images/gallery/1.jpeg',
                        '/static/images/gallery/0.jpeg',
                        '/static/images/gallery/2.jpeg',
                        '/static/images/gallery/3.jpeg',
                        '/static/images/gallery/4.jpeg',
                        '/static/images/gallery/5.jpeg',
                        '/static/images/gallery/7.jpeg',
                    ]}
                />
            </div>
            <div className={css.thesis}>Цена:</div> от 500 руб./час (15 м2), от 700 (70 м2).
        </div>
    </Layout>
);

/*

*/
