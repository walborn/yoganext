import React  from 'react';
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


export default class Contacts extends React.PureComponent {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Layout>
                <h1>Как нас найти?</h1>

                <div className={css.contacts}>
                    <ul className={css.list}>
                        <li className={css.item}>
                            <LocationSVG className={css.location} />
                            <a target="_blank" href="https://yandex.ru/maps/-/CCu~UZy6">
                                м. Бибирево, ул. Мурановская, д.5, 3 этаж, офис 305
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="tel:+79168765413">
                                <PhoneSVG className={css.phone}/>+7 (916) 876-54-13
                            </a>
                            <a className={css.whatsapp} href="https://wa.me/79168765413"><WhatsAppSVG/></a>
                            <a className={css.viber} href="viber://chat?number=79168765413"><ViberSVG/></a>
                        </li>
                        <li className={css.item}>
                            <a href="tel:+79295659511">
                                <PhoneSVG className={css.phone}/>+7 (929) 565-95-11
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="mailto:yoga-club-om@yandex.ru?subject=Запись">
                                <EmailSVG className={css.email}/>yoga-club-om@yandex.ru
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="https://vk.com/yoga.altufyevo" target="_blank">
                                <VkSVG className={css.vk}/>Вконтакте
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="https://www.instagram.com/yogaclub_om_moscow/" target="_blank">
                                <InstaSVG className={css.insta}/>Инстаграм
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="https://www.facebook.com/yogaclubommoscow/" target="_blank">
                                <FbSVG className={css.fb}/>Фейсбук
                            </a>
                        </li>
                        <li className={css.item}>
                            <a href="http://yoga-club-om.ru/Dogovor_na_zanyatia_yogoy.docx">
                                <FileSVG className={css.file}/>Скачать договор оферты
                            </a>
                        </li>
                    </ul>

                    <div className={css.map}>
                        <YMaps>
                            <Map
                                width="100%"
                                height="350px"
                                state={{center: [55.891, 37.596669], zoom: 14}}
                            >
                                <Placemark
                                    geometry={[55.890951, 37.596669]}
                                    properties={{
                                        hintContent: 'Собственный значок метки',
                                        balloonContent: 'Это красивая метка'
                                    }}
                                    options={{
                                        iconLayout: 'default#image',
                                        iconImageHref: '/static/svg/placemarkYandex.svg',
                                        iconImageSize: [60, 68],
                                        iconImageOffset: [-30, -68]
                                    }}
                                />
                            </Map>
                        </YMaps>
                    </div>
                </div>
            </Layout>
        );
    }
}
