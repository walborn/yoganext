import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';

import Headroom from 'react-headroom';
import Row from '../Row/index';

import MenuSVG from '../../static/svg/menu.svg';
import CloseSVG from '../../static/svg/close.svg';
import LocationSVG from '../../static/svg/location.svg';
import VkSVG from '../../static/svg/social/vk.svg';
import InstaSVG from '../../static/svg/social/insta.svg';
import FbSVG from '../../static/svg/social/fb.svg';
import PhoneSVG from '../../static/svg/phone.svg';
import WhatsAppSVG from '../../static/svg/whatsapp.svg';
import ViberSVG from '../../static/svg/viber.svg';
import css from './styles.styl';


const navigation = [
    { key: '', href: '', title: 'Главная' },
    { key: 'schedule', href: 'schedule', title: 'Расписание' },
    { key: 'price', href: 'price', title: 'Цены' },
    { key: 'masters', href: 'masters', title: 'Инструкторы' },
    { key: 'rent', href: 'rent', title: 'Аренда залов' },
    { key: 'contact', href: 'contact', title: 'Контакты' },
];

const Menu = ({ className, active, list, children }) => (
    <div className={className}>
        {
            list.map(i => (
                <Link href={`/${i.href}`} key={i.key}>
                    <a key={i.key} className={[ css.item, active === i.key && css.active ].filter(Boolean).join(' ')}>{i.title}</a>
                </Link>
            ))
        }
        {children}
    </div>
);
class Index extends React.Component {
    static propTypes = {
        router: PropTypes.shape({ query: PropTypes.object }).isRequired,
    };

    state = {
        opened: false,
    };

    handleToggleMenu = opened => this.setState({ opened });

    render() {
        const { opened } = this.state;
        const active = (x => (Array.isArray(x) ? x[0] : ''))(this.props.router.pathname.match(/[a-z]+/));
        return (
            <div className={css.navigation}>
                <Headroom>
                    <div className={css.top}>
                        <Row>
                            <div className={css.home}>
                                <Link href="/"><a><img className={[ css.brand, active && css.active ].filter(Boolean).join(' ')} src="/static/images/logoOrange.png" /></a></Link>
                            </div>
                            <div className={css.location}>
                                <LocationSVG className={css.image} />
                                <a target="_blank" href="https://yandex.ru/maps/-/CCu~UZy6">
                                    м. Бибирево, ул. Мурановская, д.5, 3 этаж, офис 305
                                </a>
                            </div>
                            <div className={css.social}>
                                <div className={css.item}>
                                    <a href="https://vk.com/yoga.altufyevo" target="_blank">
                                        <VkSVG className={[ css.image, css.vk ].join(' ')} />
                                    </a>
                                </div>
                                <div className={css.item}>
                                    <a href="https://www.instagram.com/yogaclub_om_moscow/" target="_blank">
                                        <InstaSVG className={[ css.image, css.insta ].join(' ')} />
                                    </a>
                                </div>
                                <div className={css.item}>
                                    <a href="https://www.facebook.com/yogaclubommoscow/" target="_blank">
                                        <FbSVG className={[ css.image, css.fb ].join(' ')} />
                                    </a>
                                </div>
                            </div>
                            <div className={css.phone}>
                                <a href="tel:+79168765413"><PhoneSVG className={css.image} />+7 (916) 876-54-13</a>
                                <a className={css.whatsapp} href="https://wa.me/79168765413"><WhatsAppSVG /></a>
                                <a className={css.viber} href="viber://chat?number=79168765413"><ViberSVG /></a>
                            </div>
                        </Row>
                        <MenuSVG className={css.sandwich} onClick={() => this.handleToggleMenu(true)} />
                    </div>
                    <div className={css.bottom}>
                        <Row>
                            <Menu className={css.menuBottom} active={active} list={navigation} />
                        </Row>
                    </div>
                </Headroom>
                { opened && <div className={css.backdrop} onClick={() => this.handleToggleMenu(false)} />}
                <Menu className={[ css.menuRight, opened && css.opened ].filter(Boolean).join(' ')} active={active} list={navigation}>
                    <CloseSVG className={css.close} onClick={() => this.handleToggleMenu(false)} />
                </Menu>
            </div>
        );
    }
}

export default withRouter(Index);
