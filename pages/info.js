import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Layout from '../components/Layout/index';
import LocationSVG from '../static/svg/location.svg';
import css from '../styles/info.styl';


export default class Contacts extends React.PureComponent {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Layout>
                <h2 style={{ marginTop: -35 }}>Мы переехали!</h2>
                <p className={css.subtitle}>
                    <div>Занятия начнутся <b>2 марта</b>.</div>
                </p>
                <div className={css.contacts}>
                    <div className={css.location}>
                        <LocationSVG />
                        <a target="_blank" href="https://yandex.ru/maps/-/CKaVm-ZC">
                            м.&nbsp;Алтуфьево, ул.&nbsp;Шенкурский&nbsp;проезд,&nbsp;д.3Б, 3&nbsp;этаж, офис&nbsp;308
                        </a>
                    </div>

                    <div className={css.map}>
                        <YMaps>
                            <Map
                                width="100%"
                                height="350px"
                                state={{ center: [ 55.8943, 37.59 ], zoom: 15 }}
                            >
                                <Placemark
                                    geometry={[ 55.891426, 37.590075 ]}
                                    properties={{
                                        hintContent: 'Собственный значок метки',
                                        balloonContent: 'Это красивая метка',
                                    }}
                                    options={{
                                        iconLayout: 'default#image',
                                        iconImageHref: '/static/svg/placemarkYandex.svg',
                                        iconImageSize: [ 60, 68 ],
                                        iconImageOffset: [ -30, -68 ],
                                    }}
                                />
                            </Map>
                        </YMaps>
                    </div>
                </div>
                <h2>Как нас найти?</h2>
                <p>Это Бизнес-центр. При входе на охране надо предъявлять <strong>ПАСПОРТ</strong> или водительское удостоверение!!!</p>
                <div className={css.images}>
                    <img src="/static/images/relocation/0.jpg" />
                    
                    <img src="/static/images/relocation/1.jpg" />
                    <p>На 3 этаже лифт не останавливается. Поэтому можно доехать на 4 этаж и спуститься по лестнице на 3 этаж, или просто по лестнице подняться на 3 этаж.</p>
                    <img src="/static/images/relocation/2.jpg" />
                    <img src="/static/images/relocation/3.jpg" />

                    <h2>Внимание!</h2>

                    <p style={{ textAlign: 'center' }}>Расписание со <b>2 марта</b> немного изменится! На сайте информация по расписанию актуальная.</p>

                    <h2>Встречаемся на ковриках!!!</h2>
                </div>

            </Layout>
        );
    }
}
