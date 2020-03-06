import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Layout from '../components/Layout/index';
import LocationSVG from '../static/svg/location.svg';
import PhoneSVG from '../static/svg/phone.svg';
import WhatsAppSVG from '../static/svg/whatsapp.svg';
import ViberSVG from '../static/svg/viber.svg';
import EmailSVG from '../static/svg/email.svg';
import VkSVG from '../static/svg/social/vk.svg';
import InstaSVG from '../static/svg/social/insta.svg';
import FbSVG from '../static/svg/social/fb.svg';
import FileSVG from '../static/svg/file.svg';
import css from '../styles/contact.styl';
import TelegramSVG from '../static/svg/telegram.svg';


export default class Contacts extends React.PureComponent {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Layout>
                <h1>Контакты</h1>

                <div className={css.contacts}>
                    <ul className={css.list}>
                        <li className={css.item}>
                            <LocationSVG className={css.location} />
                            <a target="_blank" href="https://yandex.ru/maps/-/CKaVm-ZC">
                                м.&nbsp;Алтуфьево, ул.&nbsp;Шенкурский&nbsp;проезд,&nbsp;д.3Б, 3&nbsp;этаж, офис&nbsp;308
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="tel:+79168765413">
                                <PhoneSVG className={css.phone} />+7 (916) 876-54-13
                            </a>
                            <a className={css.whatsapp} href="https://wa.me/79168765413"><WhatsAppSVG /></a>
                            <a className={css.viber} href="viber://chat?number=79168765413"><ViberSVG /></a>
                            <a className={css.telegram} href="tg://resolve?domain=yoga_club_om"><TelegramSVG /></a>

                        </li>
                        <li className={css.item}>
                            <a href="tel:+79295659511">
                                <PhoneSVG className={css.phone} />+7 (929) 565-95-11
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="mailto:yoga-club-om@yandex.ru?subject=Запись">
                                <EmailSVG className={css.email} />yoga-club-om@yandex.ru
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="https://vk.com/yoga.altufyevo" target="_blank">
                                <VkSVG className={css.vk} />Вконтакте
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="https://www.instagram.com/yogaclub_om_moscow/" target="_blank">
                                <InstaSVG className={css.insta} />Инстаграм
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="https://www.facebook.com/yogaclubommoscow/" target="_blank">
                                <FbSVG className={css.fb} />Фейсбук
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="/static/docs/public-offer__yoga-club-om.pdf">
                                <FileSVG className={css.file} />Скачать договор оферты
                            </a>
                        </li>
                    </ul>

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
                                        hintContent: 'Расположение клуба ОМ',
                                        balloonContent: 'Йога клуб ОМ',
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

                <h1>Как нас найти?</h1>

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
