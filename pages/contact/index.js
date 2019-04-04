import React  from 'react';
import Layout from '../../components/Layout';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import LocationSVG from '../../static/svg/location.svg';
import PhoneSVG from '../../static/svg/phone.svg';
import WhatsAppSVG from '../../static/svg/whatsapp.svg';
import ViberSVG from '../../static/svg/viber.svg';
import EmailSVG from '../../static/svg/email.svg';
import VkSVG from '../../static/svg/social/vk.svg';
import InstaSVG from '../../static/svg/social/insta.svg';
import FbSVG from '../../static/svg/social/fb.svg';
import FileSVG from '../../static/svg/file.svg';


export default () => (
    <Layout>
        <h1>Как нас найти?</h1>

        <ul className="contacts__list">
            <li className="contacts__item"><LocationSVG className="contacts__image contacts__image--location" />м. Бибирево, ул. Мурановская, д.5, 3 этаж, офис 305</li>
            <li className="contacts__item">
                <a href="tel:+79168765413"><PhoneSVG className="contacts__image contacts__image--phone" />+7 (916) 876-54-13</a>
                <a className="contacts__image contacts__image--whatsapp" href="https://wa.me/79168765413"><WhatsAppSVG /></a>
                <a className="contacts__image contacts__image--viber" href="viber://chat?number=79168765413"><ViberSVG /></a>
            </li>
            <li className="contacts__item"><a href="tel:+79295659511"><PhoneSVG className="contacts__image contacts__image--phone" />+7 (929) 565-95-11</a></li>
            <li className="contacts__item">
                <a href="mailto:yoga-club-om@yandex.ru?subject=Запись"><EmailSVG className="contacts__image contacts__image--email" />yoga-club-om@yandex.ru</a>
            </li>
            <li className="contacts__item"><a href="https://vk.com/yoga.altufyevo" target="_blank"><VkSVG className="contacts__image contacts__image--vk" />Вконтакте</a></li>
            <li className="contacts__item"><a href="https://www.instagram.com/yogaclub_om_moscow/" target="_blank"><InstaSVG className="contacts__image contacts__image--insta" />Инстаграм</a></li>
            <li className="contacts__item"><a href="https://www.facebook.com/yogaclubommoscow/" target="_blank"><FbSVG className="contacts__image contacts__image--fb" />Фейсбук</a></li>
            <li className="contacts__item"><a href="http://yoga-club-om.ru/Dogovor_na_zanyatia_yogoy.docx"><FileSVG className="contacts__image contacts__image--file" />Скачать договор оферты</a></li>
        </ul>

        <div className="contacts__map">
            <YMaps>
                <Map
                    width="100%"
                    height="350px"
                    state={{ center: [55.891, 37.596669], zoom: 14 }}
                >
                    <Placemark
                        geometry={[55.890951, 37.596669]}
                        properties={{
                            hintContent: 'Собственный значок метки',
                            balloonContent: 'Это красивая метка'
                        }}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: '/static/images/placemark.png',
                            iconImageSize: [30, 30],
                            iconImageOffset: [-15, -15]
                        }}
                    />
                </Map>
            </YMaps>
        </div>
    </Layout>
)
