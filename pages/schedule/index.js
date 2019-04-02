import React  from 'react';
import Layout from '../../components/Layout'
import TimeSVG from '../../static/svg/time.svg';
import ArrowSVG from '../../static/svg/arrow.svg';
import Cube1SVG from '../../static/svg/cube1.svg';
import Cube4SVG from '../../static/svg/cube4.svg';
import list from './db';


const hhmm = minutes => {
    const mm = minutes %60;
    return `${`0${(minutes - mm)/60}`.slice(-2)}:${`0${mm}`.slice(-2)}`
};

const toDate = x => new Date(...(([ d, m, y ]) => [ +y, +m-1, +d ])(x.key.split('.')));

const getWeek = (day0) => {
    const date =  toDate(day0);
    const monday = date.getTime() - (date.getDay() - 1) * 86400000;
    const [ mon, sun ] = [ new Date(monday), new Date(monday + 6 * 86400000) ];
    const months = [ 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря' ];
    return `${mon.getDate()} ${months[mon.getMonth()]} - ${sun.getDate()} ${months[sun.getMonth()]}`
};

const Coach = ({ className, miss, locum, coach }) => {
    if (miss) return <div className={`${className} ${className}--miss`}>Отмена</div>;
    if (locum) return <div className={`${className} ${className}--locum`}><span style={{ color: '#b2bbc6' }}>{coach}</span> → {locum}</div>;
    if (coach) return <div className={className}>{coach}</div>;
};

export default class Schedule extends React.Component {
    state = {
        selected: 0,
        page: 0,
        view: true,
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleClick = selected => () => {
        this.setState({selected});
    };

    render() {
        const {selected, page, view} = this.state;
        const item = list[selected];

        const hasPrev = page;
        const hasNext = list.length > (page + 1) * 7;

        const table = list.slice(page * 7, page * 7 + 7)
            .reduce((res, item) => {
                const day = (['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'])[toDate(item).getDay()]
                item.value.forEach(v => {
                    const h = v.time / 60 | 0;
                    if (!res[h]) res[h] = {[day]: [v]};
                    else {
                        res[h][day] = res[h][day] ? [...res[h][day], v] : [v];
                    }
                });
                return res;
            }, []);

        return (
            <Layout>
                <div className="schedule__week">
                    {getWeek(list[page * 7])}
                    <button
                        className="schedule__view-button"
                        onClick={() => this.setState({view: !view})}
                        children={view ? <Cube1SVG/> : <Cube4SVG/>}
                    />

                    <ArrowSVG
                        className={['schedule__arrow schedule__arrow--prev', hasPrev && 'schedule__arrow--visible']}
                        onClick={() => hasPrev && this.setState({page: page - 1})}
                    />
                    <ArrowSVG
                        className={['schedule__arrow schedule__arrow--next', hasNext && 'schedule__arrow--visible']}
                        onClick={() => hasNext && this.setState({page: page + 1})}
                    />
                </div>

                <div className={['schedule__table__wrapper', !view && 'visible']}>
                    <table className="schedule__table">
                        <thead>
                        <th className="schedule__table__time-header"><TimeSVG/></th>
                        {
                            list.slice(page * 7, page * 7 + 7).map((i, index) => {
                                const date = toDate(i);
                                return (
                                    <th
                                        className={['schedule__table__header', index === selected && 'active']}
                                        key={i.key}
                                        onClick={this.handleClick(index)}
                                    >
                                        <div
                                            className="schedule__table__day">{(['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'])[date.getDay()]}</div>
                                        <div className="schedule__table__date">{date.getDate()}</div>
                                    </th>
                                )
                            })
                        }
                        </thead>
                        <tbody>
                        {
                            table.map((item, index) => (
                                <tr className="schedule__table__row">
                                    <td className="schedule__table__time-cell">{index}</td>
                                    {
                                        ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(i => (
                                            <td className="schedule__table__cell">
                                                {
                                                    item[i] && item[i].map(card => (
                                                        <div className="schedule__table__cell__item">
                                                            <div
                                                                className={`schedule__table__cell__category schedule__table__cell__category--${card.category}`}/>
                                                            <div
                                                                className="schedule__table__cell__time">{hhmm(card.time)} - {hhmm(card.time + card.duration)}</div>
                                                            <div className="schedule__table__cell__name">
                                                                <div
                                                                    className="schedule__table__cell__name__subject">{card.name}</div>
                                                                <Coach className="schedule__table__cell__name__coach"
                                                                       miss={card.miss} locum={card.locum}
                                                                       coach={card.coach}/>
                                                            </div>
                                                            <div
                                                                className="schedule__table__cell__level">{card.level}</div>
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
                <div className={['schedule__list__wrapper', view && 'visible']}>
                    <ul className="schedule__header">
                        {
                            list.slice(page * 7, page * 7 + 7).map((i, index) => {
                                const date = toDate(i);
                                return (
                                    <li
                                        className={['schedule__header__item', index === selected && 'active']}
                                        key={i.key}
                                        onClick={this.handleClick(index)}
                                    >
                                        <div
                                            className="schedule__header__day">{(['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'])[date.getDay()]}</div>
                                        <div className="schedule__header__date">{date.getDate()}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="schedule__body">
                        {
                            item.value.map(i => (
                                <div className="schedule__body__item">
                                    <div
                                        className={`schedule__body__category schedule__body__category--${i.category}`}/>
                                    <div
                                        className="schedule__body__time">{hhmm(i.time)} - {hhmm(i.time + i.duration)}</div>
                                    <div className="schedule__body__name">
                                        <div className="schedule__body__name__subject">{i.name}</div>
                                        <Coach className="schedule__body__name__coach" miss={i.miss} locum={i.locum}
                                               coach={i.coach}/>
                                    </div>
                                    <div className="schedule__body__level">{i.level}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Layout>
        )
    }
}
