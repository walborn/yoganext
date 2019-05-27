import React  from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout/index';
import Button from '../components/Button';
import TimeSVG from '../static/svg/time.svg';
import LoadingSVG from '../static/svg/loading.svg';
import css from '../styles/scedule.styl';
import isEqual from 'lodash.isequal';

const WEEKDAYS = [ 'sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat' ];
const weekdays = { 'ru': { sun: 'Вс', mon: 'Пн', tue: 'Вт', wed: 'Ср', thurs: 'Чт', fri: 'Пт', sat: 'Сб', order: [ 1, 2, 3, 4, 5, 6, 0 ] } };
const hhmm = minutes => ((mm, minutes) => `${`0${(minutes - mm)/60}`.slice(-2)}:${`0${mm}`.slice(-2)}`)(minutes % 60, minutes);

const fetchData = async () => {
    const res = await fetch('https://om-rest.herokuapp.com/lessons?sort=day&offset=0&limit=100'); // hidden:false
    const lessons = await res.json();
    const list = lessons.rows.reduce((res, item) => ({...res, [item.day]: [...(res[item.day] || []), item]}), {});

    if (!Object.keys(list).length) return { list: {} };
    const dates = Object.keys(list);

    const compare = (a, b) => {
        if (+a.time < +b.time) return -1;
        if (+a.time > +b.time) return 1;
        if (+a.duration < +b.duration) return -1;
        if (+a.duration > +b.duration) return 1;
        return 0;
    };

    dates.forEach(day => list[day] = list[day].sort(compare));
    return list;
};

export default class Schedule extends React.Component {
    static Master = ({ className, disabled, alternate, master }) => {
        const classNames = name => [ className, css[name] ].join(' ');
        if (alternate) return <div className={classNames('alternate')}><span>{master}</span> → <span>{alternate}</span></div>;
        if (master) return <div className={classNames('master')}>{master}</div>;
        return <div className={classNames('blank')}>Не назначен</div>;
    };
    state = {
        day: new Date().getDay(),
        view: true,
        loading: true,
        list: this.props.list,
    };
    async componentDidMount() {
        window.scrollTo(0, 0);
        if (!this.props.list) {
            this.setState({ list: await fetchData() })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { list } = nextProps;
        if (!isEqual(list, this.props.list)) this.setState({ list });
    }

    handleChangeDay = day => this.setState({ day });
    handleChangeView = view => this.setState({ view });

    render() {
        const { day, view, list } = this.state;
        const table = list && Object.keys(list).reduce((res, d) => {
            list[d].forEach(item => {
                const hour = item.time / 60 | 0;
                if (!res[hour]) res[hour] = { [d]: [ item ] };
                else if (!Array.isArray(res[hour][d])) res[hour][d] = [ item ];
                else res[hour][d] = [ ...res[hour][d], item ];
            });
            return res;
        }, []);

        return (
            <Layout>
                <div className={css.schedule}>
                    {
                        !list
                            ? <div className={css.loader}><LoadingSVG /></div>
                            : <>
                                <Button
                                    className={css.view}
                                    onClick={() => this.handleChangeView(!view)}
                                    children={view ? 'Показать всю неделю' : 'Показать один день'}
                                    orange
                                />
                                    {
                                        view
                                            ? (
                                                <div className={css.day}>
                                                    <div className={css.header}>
                                                        {
                                                            weekdays.ru.order.map(d => (
                                                                <div
                                                                    key={WEEKDAYS[d]}
                                                                    className={[ css.item, d === day && css.active ].filter(Boolean).join(' ')}
                                                                    onClick={() => d !== day && this.handleChangeDay(d)}
                                                                >
                                                                    {weekdays.ru[WEEKDAYS[d]]}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className={css.body}>
                                                        {
                                                            list[day] && list[day].map(i => (
                                                                <div key={i.id} className={css.item}>
                                                                    <div className={[ css.category, css[i.category] ].join(' ')}/>
                                                                    <div className={css.time}>{hhmm(+i.time)} - {hhmm(+i.time + +i.duration)}</div>
                                                                    <div className={css.title}>{i.title}</div>
                                                                    <Schedule.Master
                                                                        className={css.master}
                                                                        master={i.master}
                                                                        alternate={i.alternate}
                                                                        disabled={i.disabled}
                                                                    />
                                                                    <div className={css.level}>{i.level}</div>
                                                                    <div className={css.note} dangerouslySetInnerHTML={{ __html: i.note }} />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={css.wrapper}>
                                                    <table className={css.table}>
                                                        <thead>
                                                        <tr className={css.header}>
                                                            <td className={css.time}><TimeSVG/></td>
                                                            {
                                                                weekdays.ru.order.map(d => (
                                                                    <td
                                                                        key={WEEKDAYS[d]}
                                                                        onClick={() => this.setState({ day: d })}
                                                                        className={[ css.item, d === day && css.active ].filter(Boolean).join(' ')}
                                                                    >
                                                                        {weekdays.ru[WEEKDAYS[d]]}
                                                                    </td>
                                                                ))
                                                            }
                                                        </tr>
                                                        </thead>
                                                        <tbody style={{ transform: 'translate(0, 10px)' }}>
                                                        {
                                                            table.map((row, index) => (
                                                                <tr className={css.row} key={index}>
                                                                    <td className={css.cellTime}>{index}</td>
                                                                    {
                                                                        weekdays.ru.order.map(d => (
                                                                            <td className={css.cell} key={d}>
                                                                                {
                                                                                    row[d] && row[d].filter(i => !i.hidden).map(i => (
                                                                                        <div key={i.id} className={css.cellItem}>
                                                                                            <div className={[ css.category, css[i.category] ].join(' ')}/>
                                                                                            <div className={css.time}>{hhmm(+i.time)} - {hhmm(+i.time + +i.duration)}</div>
                                                                                            <div className={css.title}>{i.title}</div>
                                                                                            <Schedule.Master
                                                                                                className={css.master}
                                                                                                master={i.master}
                                                                                                alternate={i.alternate}
                                                                                            />
                                                                                            <div className={css.level}>{i.level}</div>
                                                                                            <div className={css.note} dangerouslySetInnerHTML={{ __html: i.note }} />
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
                                                </div>
                                            )
                                    }
                            </>
                    }
                </div>
            </Layout>
        )
    }
}


Schedule.getInitialProps = async function({ req }) {
    if (!req) return {};
    return { list: await fetchData() };
};

