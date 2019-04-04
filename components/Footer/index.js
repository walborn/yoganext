import React from 'react';
import Link from 'next/link';
import LocationSVG from '../../static/svg/location.svg';
import PhoneSVG from '../../static/svg/phone.svg';
import WhatsAppSVG from '../../static/svg/whatsapp.svg';
import ViberSVG from '../../static/svg/viber.svg';
import EmailSVG from '../../static/svg/email.svg';
import VkSVG from '../../static/svg/social/vk.svg';
import InstaSVG from '../../static/svg/social/insta.svg';
import FbSVG from '../../static/svg/social/fb.svg';
import FileSVG from '../../static/svg/file.svg';
import './styles.scss';


export default () => (
    <footer id="footer">
        <div className="footer row">
            <Link href="/"><div className="logo"><img src="/static/images/logoOrange.png" /></div></Link>
            <ul className="social">
                <li className="social__item"><a href="https://vk.com/yoga.altufyevo" target="_blank"><VkSVG className="social__image social__image--vk" /></a></li>
                <li className="social__item"><a href="https://www.instagram.com/yogaclub_om_moscow/" target="_blank"><InstaSVG className="social__image social__image--insta" /></a></li>
                <li className="social__item"><a href="https://www.facebook.com/yogaclubommoscow/" target="_blank"><FbSVG className="social__image social__image--fb" /></a></li>
            </ul>
            <ul className="contacts">
                <li className="contacts__item"><a href={`${process.env.PUBLIC_URL}/privacy_policy_yoga_club_om.pdf`}><FileSVG className="contacts__image contacts__image--file" />Политика конфиденциальности</a></li>
                <li className="contacts__item"><LocationSVG className="contacts__image contacts__image--location" />Москва, м. Бибирево, ул. Мурановская, д.5, 3 этаж, офис 305</li>
                <li className="contacts__item">
                    <a href="tel:+79168765413"><PhoneSVG className="contacts__image contacts__image--phone" />+7 (916) 876-54-13</a>
                    <a className="contacts__link--whatsapp" href="https://wa.me/79168765413"><WhatsAppSVG /></a>
                    <a className="contacts__link--viber" href="viber://chat?number=79168765413"><ViberSVG /></a>
                </li>
                <li className="contacts__item"><a href="tel:+79295659511"><PhoneSVG className="contacts__image contacts__image--phone" />+7 (929) 565-95-11</a></li>
                <li className="contacts__item">
                    <a href="mailto:yoga-club-om@yandex.ru?subject=Запись"><EmailSVG className="contacts__image contacts__image--email" />yoga-club-om@yandex.ru</a>
                </li>
            </ul>
        </div>
    </footer>
);
