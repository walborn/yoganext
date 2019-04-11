import React  from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../../components/Layout'
import Button from '../../components/Button';
import TimeSVG from '../../static/svg/time.svg';
import ArrowSVG from '../../static/svg/arrow.svg';
import Cube1SVG from '../../static/svg/cube1.svg';
import Cube4SVG from '../../static/svg/cube4.svg';
import './styles.scss';

const WEEKDAYS_RUS = [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ];
const WEEKDAYS = [ 'sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat' ];
const MONTH = [ 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря' ];

const hhmm = minutes => {
    const mm = minutes % 60;
    return `${`0${(minutes - mm)/60}`.slice(-2)}:${`0${mm}`.slice(-2)}`
};

const toDate = x => new Date(...(([ d, m, y ]) => [ +y, +m-1, +d ])(x.split('.')));

const getWeek = (minDate, page) => {
    const monday = minDate.getTime() - (minDate.getDay() - 1 - 7 * page) * 86400000;
    const week = WEEKDAYS.reduce((res, day, index) => ({ ...res, [day]: new Date(monday + (index + 6) % 7  * 86400000) }), {});
    const { mon, sun } = week;
    const title = `${mon.getDate()} ${MONTH[mon.getMonth()]} - ${sun.getDate()} ${MONTH[sun.getMonth()]}`;
    const days = (x => [ ...x.slice(1), x[0] ])(WEEKDAYS.map((day, index) => ({ day, date: week[day], rusDay: WEEKDAYS_RUS[index] })));
    return { days, title };
};

const Master = ({ className, miss, alternate, master }) => {
    if (miss) return <div className={`${className} ${className}--miss`}>Отмена</div>;
    if (alternate) return <div className={`${className} ${className}--locum`}><span style={{ color: '#b2bbc6' }}>{master}</span> → {alternate}</div>;
    if (master) return <div className={className}>{master}</div>;
    return <div className={className}><span style={{ color: '#b2bbc6' }}>Не назначен</span></div>;
};

export default class Schedule extends React.Component {
    state = {
        selected: new Date().toLocaleDateString('ru'),
        page: 0,
        view: true,
    };
    componentWillMount() {
        const minDate = toDate(this.props.minDate);
        const maxDate = toDate(this.props.maxDate);
        const pages = ((minDate.getDay() - 1) + (maxDate - minDate) / 86400000) / 7;
        this.setState({ minDate, maxDate, pages })
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleClick = selected => {
        this.setState({ selected });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.minDate !== this.props.minDate || nextProps.maxDate !== this.props.maxDate) {
            const minDate = toDate(nextProps.minDate);
            const maxDate = toDate(nextProps.maxDate);
            const pages = ((minDate.getDay() - 1) + (maxDate - minDate) / 86400000) / 7;
            this.setState({ minDate, maxDate, pages })
        }
    }

    handlePage = (delta) => {
        const { page } = this.state;
        const selected = new Date(toDate(this.state.selected).getTime() + 7 * 86400000 * delta).toLocaleDateString('ru');

        this.setState({ page: page + delta, selected });
    };

    render() {
        const { list } = this.props;
        const { selected, page, pages, minDate, view } = this.state;
        const hasPrev = page;
        const hasNext = pages > page + 1;

        const table = Object.keys(list).reduce((res, date) => {
            const day = WEEKDAYS[toDate(date).getDay()];
            list[date].forEach(item => {
                const hour = item.time / 60 | 0;
                if (!res[hour]) res[hour] = { [day]: [ item ] };
                else if (!Array.isArray(res[hour][day])) res[hour][day] = [ item ];
                else res[hour][day] = [ ...res[hour][day], item ];
            });
            return res;
        }, []);

        const week = getWeek(minDate, page);

        return (
            <Layout>
                <div className="schedule">
                    <div className="schedule__week">
                        {week.title}
                        <Button
                            className="schedule__view-button"
                            onClick={() => this.setState({view: !view})}
                            children={view ? <Cube1SVG /> : <Cube4SVG />}
                            orange
                        />
                        <ArrowSVG
                            className={['schedule__arrow schedule__arrow--prev', hasPrev && 'schedule__arrow--visible'].filter(Boolean).join(' ')}
                            onClick={() => hasPrev && this.handlePage(-1)}
                        />
                        <ArrowSVG
                            className={['schedule__arrow schedule__arrow--next', hasNext && 'schedule__arrow--visible'].filter(Boolean).join(' ')}
                            onClick={() => hasNext && this.handlePage(+1)}
                        />
                    </div>

                    <div className={['schedule__table__wrapper', !view && 'visible'].filter(Boolean).join(' ')}>
                        <table className="schedule__table">
                            <thead>
                                <tr>
                                    <td className="schedule__table__time-header"><TimeSVG/></td>
                                    {
                                        week.days.map(wd => (
                                            <td
                                                className={['schedule__table__header', wd.date.toLocaleDateString('ru') === selected && 'active'].filter(Boolean).join(' ')}
                                                key={wd.date}
                                                onClick={() => this.handleClick(wd.date.toLocaleDateString('ru'))}
                                            >
                                                <div className="schedule__table__day">{wd.rusDay}</div>
                                                <div className="schedule__table__date">{wd.date.getDate()}</div>
                                            </td>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                            {
                                table.map((row, index) => (
                                    <tr className="schedule__table__row" key={index}>
                                        <td className="schedule__table__time-cell">{index}</td>
                                        {
                                            week.days.map(({ day }) => (
                                                <td className="schedule__table__cell" key={day}>
                                                    {
                                                        row[day] && row[day].map(card => (
                                                            <div key={card.id} className="schedule__table__cell__item">
                                                                <div className={`schedule__table__cell__category schedule__table__cell__category--${card.category}`}/>
                                                                <div className="schedule__table__cell__time">{hhmm(+card.time)} - {hhmm(+card.time + +card.duration)}</div>
                                                                <div className="schedule__table__cell__name">
                                                                    <div className="schedule__table__cell__name__subject">{card.name}</div>
                                                                    <Master
                                                                        className="schedule__table__cell__name__coach"
                                                                        miss={card.disabled === 'true'}
                                                                        alternate={card.alternate}
                                                                        master={card.master}
                                                                    />
                                                                </div>
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
                    <div className={['schedule__list__wrapper', view && 'visible'].filter(Boolean).join(' ')}>
                        <ul className="schedule__header">
                            {
                                week.days.map(wd => (
                                    <li
                                        className={[ 'schedule__header__item', wd.date.toLocaleDateString('ru') === selected && 'active' ].filter(Boolean).join(' ')}
                                        key={wd.date}
                                        onClick={() => this.handleClick(wd.date.toLocaleDateString('ru'))}
                                    >
                                        <div
                                            className="schedule__header__day">{wd.rusDay}</div>
                                        <div className="schedule__header__date">{wd.date.getDate()}</div>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="schedule__body">
                            {
                                list[selected] && list[selected].map(i => (
                                    <div key={i.id} className="schedule__body__item">
                                        <div className={`schedule__body__category schedule__body__category--${i.category}`}/>
                                        <div className="schedule__body__time">{hhmm(+i.time)} - {hhmm(+i.time + +i.duration)}</div>
                                        <div className="schedule__body__name">
                                            <div className="schedule__body__name__subject">{i.name}</div>
                                            <Master
                                                className="schedule__body__name__coach"
                                                miss={i.disabled === 'true'}
                                                alternate={i.alternate}
                                                master={i.master}
                                            />
                                        </div>
                                        <div className="schedule__body__level">{i.level}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}


Schedule.getInitialProps = async function() {
    const res = await fetch('https://om-rest.herokuapp.com/events');
    const events = await res.json();
    const list = events
        .filter(i => i.disabled === 'false')
        .reduce((res, item) => ({...res, [item.date]: [...(res[item.date] || []), item]}), {});

    if (!Object.keys(list).length) return { list: {}, minDate: new Date().toLocaleDateString('ru'), maxDate: new Date().toLocaleDateString('ru') };
    const dates = Object.keys(list);
    const [ minDate, maxDate ] = dates.slice(1).reduce(([ min, max ], next) => {
        const a = +(min.slice(6) + min.slice(3,5) + min.slice(0,2));
        const b = +(max.slice(6) + max.slice(3,5) + max.slice(0,2));
        const c = +(next.slice(6) + next.slice(3,5) + next.slice(0,2));
        if (c < a) return [ next, max ];
        if (c > b) return [ min, next ];
        return [ min, max ];
    }, [ dates[0], dates[0] ]);

    const compare = (a, b) => {
        if (+a.time < +b.time) return -1;
        if (+a.time > +b.time) return 1;
        if (+a.duration < +b.duration) return -1;
        if (+a.duration > +b.duration) return 1;
        return 0;
    };

    dates.forEach(date => list[date] = list[date].sort(compare));
    return { list, minDate, maxDate };
};
