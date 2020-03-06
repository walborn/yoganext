import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout/index';
import Subscribe from '../components/Subscribe/index';
import Unlimited from '../components/Unlimited/index';
import css from '../styles/index.styl';


const Home = styled.div`
    &:before {
        content: '';
        position: absolute;
        top: 20px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        opacity: 0.03;
        background: url(/static/images/logo.png) no-repeat 50% 50%;
        background-size: cover;
        z-index: -1;
    }
`;

const Brand = styled.img`
    width: 100%;
    max-width: 400px;
`;

const Section = styled.section`
    padding: 10px 0;
`;

export default () => {
    React.useEffect(() => window.scrollTo(0, 0), []);

    return (
        <Layout>
            <Home>
                <h1><Brand src="/static/images/brand.png" alt="Йога клуб ОМ" /></h1>
                <Section>
                    <Subscribe />
                    <strong>Наш клуб</strong> - это сообщество увлеченных людей, целью которых является
                    саморазвитие и помощь в
                    этом другим людям. Мы всегда открыты для нового, но при этом бережно чтим древние традиции.
                </Section>

                <h2>Выбери свою практику</h2>
                <Section>
                    Можно выбрать практику в удобное для Вас время, различного уровня сложности  и созвучную Вашим внутренним устремлениям.
                    Занятия проводят опытные и сертифицированные инструкторы, с которыми можно заниматься - <strong>индивидуально</strong> или <strong>в группе</strong>.
                </Section>
                <Section><strong>ЙОГА:</strong>
                    <div className={css.item}>Классическая Хатха йога</div>
                    <div className={css.item}>Аштанга йога</div>
                    <div className={css.item}>Кундалини йога</div>
                    <div className={css.item}>Мягкие практики <strong>для беременных</strong></div>
                </Section>

                <Section><strong>СПЕЦИАЛЬНЫЕ НАПРАВЛЕНИЯ:</strong>
                    <div className={css.item}>Практика "Здоровая спина"</div>
                    <div className={css.item}>Общая физическая подготовка</div>
                </Section>
                <Section><strong>ЕДИНОБОРСТВА (ДЛЯ ДЕТЕЙ ОТ 5 ДО 14 ЛЕТ И ВЗРОСЛЫХ ОТ 15 ДО 99)</strong>
                    <div className={css.item}>Джит Кун-до - стиль, основанный Брюсом Ли</div>
                </Section>


                <h2>Безлимитная неделя!</h2>
                <Section><Unlimited /></Section>
            </Home>
        </Layout>
    );
};
