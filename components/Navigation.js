import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router'

import Headroom from 'react-headroom';

// import LogoPNG from '../static/images/logoOrange.png';
import MenuSVG from '../static/svg/menu.svg';
import CloseSVG from '../static/svg/close.svg';
import LocationSVG from '../static/svg/location.svg';
import VkSVG from '../static/svg/social/vk.svg';
import InstaSVG from '../static/svg/social/insta.svg';
import FbSVG from '../static/svg/social/fb.svg';
import PhoneSVG from '../static/svg/phone.svg';
import WhatsAppSVG from '../static/svg/whatsapp.svg';
import ViberSVG from '../static/svg/viber.svg';
import './navigation.scss';


const navigation = [
    { key: 'schedule', href: 'schedule', title: 'Расписание' },
    { key: 'price', href: 'price', title: 'Цены' },
    { key: 'master', href: 'master/list', title: 'Инструкторы' },
    { key: 'rent', href: 'rent', title: 'Аренда залов' },
    { key: 'contact', href: 'contact', title: 'Контакты' },
];

const Menu = ({ className, active, list, children }) => (
    <div className={className}>
        {
            list.map(i => (
                <Link href={`/${i.href}`}>
                    <a key={i.key} className={`item${active === i.key ? ' active' : ''}`}>{i.title}</a>
                </Link>
            ))
        }
        {children}
    </div>
);
class Navigation extends React.Component {
    static propTypes = {
        router: PropTypes.shape({ query: PropTypes.object }).isRequired,
    };

    state = {
        opened: false,
    };

    handleToggleMenu = (opened) => this.setState({ opened });

    render() {
        const { opened } = this.state;
        const active = (x => Array.isArray(x) ? x[0] : '')(this.props.router.pathname.match(/[a-z]+/));
        return (
            <div id="navigation">
                <Headroom>
                    <div className="top">
                        <div className="row">
                            <div className="home">
                                <Link href="/"><a><img className={`brand${active === '' ? ' active' : ''}`} src="/static/images/logoOrange.png"/></a></Link>
                            </div>
                            <div className="location">
                                <LocationSVG className="image"/>
                                <a target="_blank" href="https://yandex.ru/maps/-/CCu~UZy6">
                                    м. Бибирево, ул. Мурановская, д.5, 3 этаж, офис 305
                                </a>
                            </div>
                            <div className="social">
                                <div className="item">
                                    <a href="https://vk.com/yoga.altufyevo" target="_blank">
                                        <VkSVG className="image vk"/>
                                    </a>
                                </div>
                                <div className="item">
                                    <a href="https://www.instagram.com/yogaclub_om_moscow/" target="_blank">
                                        <InstaSVG className="image insta"/>
                                    </a>
                                </div>
                                <div className="item">
                                    <a href="https://www.facebook.com/yogaclubommoscow/" target="_blank">
                                        <FbSVG className="image fb"/></a>
                                </div>
                            </div>
                            <div className="phone">
                                <a href="tel:+79168765413"><PhoneSVG className="image"/>+7 (916) 876-54-13</a>
                                <a className="whatsapp" href="https://wa.me/79168765413"><WhatsAppSVG/></a>
                                <a className="viber" href="viber://chat?number=79168765413"><ViberSVG/></a>
                            </div>
                        </div>
                        <MenuSVG className="sandwich" onClick={() => this.handleToggleMenu(true)} />
                    </div>
                    <div className="bottom">
                        <Menu className="row menu-bottom" active={active} list={navigation} />
                    </div>
                </Headroom>
                <Menu className={`menu-right${opened ? ' opened' : ''}`} active={active} list={navigation}>
                    <CloseSVG className="close" onClick={() => this.handleToggleMenu(false)} />
                </Menu>

            </div>
        );
    }
}

export default withRouter(Navigation);
