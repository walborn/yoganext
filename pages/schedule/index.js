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
    const mm = minutes %60;
    return `${`0${(minutes - mm)/60}`.slice(-2)}:${`0${mm}`.slice(-2)}`
};

const toDate = x => new Date(...(([ d, m, y ]) => [ +y, +m-1, +d ])(x.split('.')));

const getWeek = (minDate, page) => {
    const date = toDate(minDate);
    const monday = date.getTime() - (date.getDay() - 1 + 7 * page) * 86400000;
    const week = WEEKDAYS.reduce((res, day, index) => ({ ...res, [day]: new Date(monday + (index + 6) % 7  * 86400000) }), {});
    const { mon, sun } = week;
    const title = `${mon.getDate()} ${MONTH[mon.getMonth()]} - ${sun.getDate()} ${MONTH[sun.getMonth()]}`;
    const days = (x => [ ...x.slice(1), x[0] ])(WEEKDAYS.map((day, index) => ({ day: WEEKDAYS_RUS[index], date: week[day] })));
    return { days, title };
};

const Coach = ({ className, miss, locum, coach }) => {
    if (miss) return <div className={`${className} ${className}--miss`}>Отмена</div>;
    if (locum) return <div className={`${className} ${className}--locum`}><span style={{ color: '#b2bbc6' }}>{coach}</span> → {locum}</div>;
    if (coach) return <div className={className}>{coach}</div>;
};

export default class Schedule extends React.Component {
    state = {
        selected: new Date().toLocaleDateString('ru'),
        page: 0,
        view: true,
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleClick = selected => {
        this.setState({selected});
    };

    render() {
        const { list, minDate } = this.props;
        const { selected, page, view } = this.state;
        const hasPrev = page;
        const hasNext = list.length > (page + 1) * 7;

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
                            onClick={() => hasPrev && this.setState({page: page - 1})}
                        />
                        <ArrowSVG
                            className={['schedule__arrow schedule__arrow--next', hasNext && 'schedule__arrow--visible'].filter(Boolean).join(' ')}
                            onClick={() => hasNext && this.setState({page: page + 1})}
                        />
                    </div>

                    <div className={['schedule__table__wrapper', !view && 'visible'].filter(Boolean).join(' ')}>
                        <table className="schedule__table">
                            <thead>
                            <th className="schedule__table__time-header"><TimeSVG/></th>
                            {
                                week.days.map(wd => (
                                    <th
                                        className={['schedule__table__header', wd.date.toLocaleDateString('ru') === selected && 'active'].filter(Boolean).join(' ')}
                                        key={wd.date}
                                        onClick={() => this.handleClick(wd.date.toLocaleDateString('ru'))}
                                    >
                                        <div className="schedule__table__day">{wd.day}</div>
                                        <div className="schedule__table__date">{wd.date.getDate()}</div>
                                    </th>
                                ))
                            }
                            </thead>
                            <tbody>
                            {
                                table.map((row, index) => (
                                    <tr className="schedule__table__row">
                                        <td className="schedule__table__time-cell">{index}</td>
                                        {
                                            WEEKDAYS.map(i => (
                                                <td className="schedule__table__cell">
                                                    {
                                                        row[i] && row[i].map(card => (
                                                            <div key={card.id} className="schedule__table__cell__item">
                                                                <div className={`schedule__table__cell__category schedule__table__cell__category--${card.category}`}/>
                                                                <div className="schedule__table__cell__time">{hhmm(card.time)} - {hhmm(card.time + card.duration)}</div>
                                                                <div className="schedule__table__cell__name">
                                                                    <div className="schedule__table__cell__name__subject">{card.name}</div>
                                                                    <Coach
                                                                        className="schedule__table__cell__name__coach"
                                                                        miss={card.disabled === 'true'}
                                                                        locum={card.alternate}
                                                                        coach={card.master}
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
                                            className="schedule__header__day">{wd.day}</div>
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
                                        <div className="schedule__body__time">{hhmm(i.time)} - {hhmm(i.time + i.duration)}</div>
                                        <div className="schedule__body__name">
                                            <div className="schedule__body__name__subject">{i.name}</div>
                                            <Coach className="schedule__body__name__coach" miss={i.disabled === 'true'} locum={i.alternate}
                                                   coach={i.master}/>
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
    const res = await fetch('http://0.0.0.0:9000/events');
    const events = await res.json();
    const list = events.reduce((res, item) => ({...res, [item.date]: [...(res[item.date] || []), item]}), {});
    const dates = Object.keys(list);
    const minDate = dates.slice(1).reduce((min, next) => {
        if (min.slice(6) < next.slice(6)) return min;
        if (min.slice(6) > next.slice(6)) return next;
        if (min.slice(3, 5) < next.slice(3, 5)) return min;
        if (min.slice(3, 5) > next.slice(3, 5)) return next;
        if (min.slice(0, 2) < next.slice(0, 2)) return min;
        if (min.slice(0, 2) > next.slice(0, 2)) return next;
        return min;
    }, dates[0]);

    return { list, minDate };
};
