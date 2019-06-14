import React from 'react';
import Link from 'next/link';
import Row from '../Row';
import LocationSVG from '../../static/svg/location.svg';
import PhoneSVG from '../../static/svg/phone.svg';
import WhatsAppSVG from '../../static/svg/whatsapp.svg';
import ViberSVG from '../../static/svg/viber.svg';
import TelegramSVG from '../../static/svg/telegram.svg';
import EmailSVG from '../../static/svg/email.svg';
import VkSVG from '../../static/svg/social/vk.svg';
import InstaSVG from '../../static/svg/social/insta.svg';
import FbSVG from '../../static/svg/social/fb.svg';
import FileSVG from '../../static/svg/file.svg';
import css from './styles.styl';


export default () => (
    <footer className={css.footer}>
        <Row>
            <Link href="/"><a className={css.logo}><img src="/static/images/logoOrange.png" /></a></Link>
            <ul className={css.social}>
                <li><a href="https://vk.com/yoga.altufyevo" target="_blank"><VkSVG className={css.vk} /></a></li>
                <li><a href="https://www.instagram.com/yogaclub_om_moscow/" target="_blank"><InstaSVG className={css.insta} /></a></li>
                <li><a href="https://www.facebook.com/yogaclubommoscow/" target="_blank"><FbSVG className={css.fb} /></a></li>
            </ul>
            <ul className={css.contacts}>
                <li>
                    <a href="/static/docs/public-offer__yoga-club-om.pdf">
                        <FileSVG className={css.file} />Политика конфиденциальности
                    </a>
                </li>
                <li><LocationSVG className={css.location} />
                    <a target="_blank" href="https://yandex.ru/maps/-/CCu~UZy6">
                        м. Бибирево, ул. Мурановская, д.5, 3 этаж, офис 305
                    </a>
                </li>
                <li>
                    <a href="tel:+79168765413"><PhoneSVG className={css.phone} />+7 (916) 876-54-13</a>
                    <a className={css.whatsapp} href="https://wa.me/79168765413"><WhatsAppSVG /></a>
                    <a className={css.viber} href="viber://chat?number=79168765413"><ViberSVG /></a>
                    <a className={css.telegram} href="tg://resolve?domain=yoga_club_om"><TelegramSVG /></a>
                </li>
                <li><a href="tel:+79295659511"><PhoneSVG className={css.phone} />+7 (929) 565-95-11</a></li>
                <li>
                    <a href="mailto:yoga-club-om@yandex.ru?subject=Запись">
                        <EmailSVG className={css.email} />yoga-club-om@yandex.ru
                    </a>
                </li>
            </ul>
        </Row>
    </footer>
);
