import React from 'react';
import Layout from '../components/Layout/index';
import Unlimited from '../components/Unlimited/index';
import css from '../styles/index.styl';


export default class Index extends React.PureComponent {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Layout>
                <div className={css.home}>
                    <h1><img className={css.brand} src="/static/images/brand.png" alt="Йога клуб ОМ" /></h1>
                    <section><strong>Наш клуб</strong> - это сообщество увлеченных людей, целью которых является
                        саморазвитие и помощь в
                        этом другим людям. Мы всегда открыты для нового, но при этом бережно чтим древние традиции.
                    </section>

                    <h2>Выбери свою практику</h2>
                    <section>
                        Можно выбрать практику в удобное для Вас время, различного уровня сложности  и созвучную Вашим внутренним устремлениям.
                        Занятия проводят опытные и сертифицированные инструкторы, с которыми можно заниматься - <strong>индивидуально</strong> или <strong>в группе</strong>.
                    </section>
                    <section><strong>ЙОГА:</strong>
                        <div className={css.item}>Классическая Хатха йога</div>
                        <div className={css.item}>Аштанга йога</div>
                        <div className={css.item}>Кундалини йога</div>
                        <div className={css.item}>Мягкие практики <strong>для беременных</strong></div>
                    </section>

                    <section><strong>СПЕЦИАЛЬНЫЕ НАПРАВЛЕНИЯ:</strong>
                        <div className={css.item}>Восстановление после родов</div>
                        <div className={css.item}>Практика "Здоровая спина"</div>
                        <div className={css.item}>Общая физическая подготовка</div>
                    </section>
                    <section><strong>ТАНЦЫ:</strong>
                        <div className={css.item}>Восточные танцы - это грация, пластика, женское здоровье и прекрасное
                            настроение!
                        </div>
                    </section>
                    <section><strong>ЕДИНОБОРСТВА (ДЛЯ ДЕТЕЙ ОТ 5 ДО 16 ЛЕТ)</strong>
                        <div className={css.item}>Джит Кун-до - стиль, основанный Брюсом Ли</div>
                    </section>


                    <h2>Безлимитная неделя!</h2>
                    <section><Unlimited /></section>
                </div>
            </Layout>
        );
    }
}

/*
                         С нами ты найдёшь именно ту практику, которая лучше всех подойдет твоему уровню и твоим
                         устремлениям.
                         Это не только физическое развитие, но глубокое управление своим умом и психофизическим
                         состоянием!
                         У нас тренируют только самые опытные и сертифицированные инструкторы, которые являются сами
                         серьезными практиками своего направления.
                         Ты можешь выбрать как заниматься - <strong>индивидуально</strong> с преподавателем или
                         вместе <strong>с группой</strong>.
                         Это не имеет значения! Имеет значение только твоя практика!

import fetch from 'isomorphic-unfetch';
import TimeSVG from '../static/svg/time.svg';

const WEEKDAYS = [ 'sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat' ];
const weekdays = { 'ru': { sun: 'Вс', mon: 'Пн', tue: 'Вт', wed: 'Ср', thurs: 'Чт', fri: 'Пт', sat: 'Сб', order: [ 1, 2, 3, 4, 5, 6, 7, 0 ] } };
const hhmm = minutes => ((mm, minutes) => `${`0${(minutes - mm)/60}`.slice(-2)}:${`0${mm}`.slice(-2)}`)(minutes % 60, minutes);

const { list } = this.props;

static Master = ({ className, disabled, alternate, master }) => {
    const classNames = name => [ className, css[name] ].join(' ');
    if (disabled) return <div className={classNames('disabled')}>Отмена</div>;
    if (alternate) return <div className={classNames('alternate')}><span>{master}</span> → <span>{alternate}</span></div>;
    if (master) return <div className={classNames('master')}>{master}</div>;
    return <div className={classNames('blank')}>Не назначен</div>;
};

Index.getInitialProps = async function() {
    const res = await fetch('https://om-rest.herokuapp.com/lessons?sort=day'); // disabled:false
    const lessons = await res.json();
    const list = lessons.rows.reduce((res, item) => ({...res, [item.day]: [...(res[item.day] || []), item]}), {});

    if (!Object.keys(list).length) return { list: null };
    return {
        list: Object.keys(list).reduce((res, d) => {
            list[d].forEach(item => {
                const hour = item.time / 60 | 0;
                if (!res[hour]) res[hour] = {[d]: [item]};
                else if (!Array.isArray(res[hour][d])) res[hour][d] = [item];
                else res[hour][d] = [...res[hour][d], item];
            });
            return res;
        }, [])
    }
};
<section className={css.schedule}>
    <table className={css.table}>
        <thead>
        <tr className={css.header}>
            <td className={css.time}><TimeSVG/></td>
            {
                weekdays.ru.order.map(i => WEEKDAYS[i]).map(wd => (<td key={wd} className={css.hItem}>{weekdays.ru[wd]}</td>))
            }
        </tr>
        </thead>
        <tbody style={{ transform: 'translate(0, 10px)' }}>
        {
            Array.isArray(list) && list.map((row, index) => row && (
                <tr className={css.row} key={index}>
                    <td className={css.cellTime}>{index}</td>
                    {
                        weekdays.ru.order.map(d => (
                            <td className={css.cell} key={d}>
                                {
                                    row[d] && row[d].map(i => (
                                        <div key={i.id} className={css.cellItem}>
                                            <div className={[ css.category, css[i.category] ].join(' ')}/>
                                            <div className={css.time}>{hhmm(+i.time)} - {hhmm(+i.time + +i.duration)}</div>
                                            <div className={css.title}>{i.title}</div>
                                            <Index.Master
                                                className={css.master}
                                                master={i.master}
                                                alternate={i.alternate}
                                                disabled={i.disabled}
                                            />
                                            <div className={css.level}>{i.level}</div>
                                        </div>

                                    ))
                                }
                            </td>

                        ))
                    }
                </tr>
            ))
        }
        </tbody>
    </table>
</section>
 */
