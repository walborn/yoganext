import React  from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../../components/Layout'
import Button from '../../components/Button';
import TimeSVG from '../../static/svg/time.svg';
import './styles.scss';

const WEEKDAYS = [ 'sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat' ];
const weekdays = { 'ru': { sun: 'Вс', mon: 'Пн', tue: 'Вт', wed: 'Ср', thurs: 'Чт', fri: 'Пт', sat: 'Сб' } };
const hhmm = minutes => ((mm, minutes) => `${`0${(minutes - mm)/60}`.slice(-2)}:${`0${mm}`.slice(-2)}`)(minutes % 60, minutes)


export default class Schedule extends React.Component {
    static Master = ({ className, disabled, alternate, master }) => {
        if (disabled) return <div className={`${className} ${className}--disabled`}>Отмена</div>;
        if (alternate) return <div className={`${className} ${className}--alternate`}><span>{master}</span> → <span>{alternate}</span></div>;
        if (master) return <div className={`${className} ${className}--master`}>{master}</div>;
        return <div className={`${className} ${className}--blank`}>Не назначен</div>;
    };
    state = {
        day: new Date().getDate(),
        view: false,
    };
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleChangeDay = day => this.setState({ day });
    handleChangeView = view => this.setState({ view });

    render() {
        const { list } = this.props;
        const { day, view } = this.state;
        const table = Object.keys(list).reduce((res, d) => {
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
                <div className='schedule'>
                    <Button
                        className='schedule__view'
                        onClick={() => this.handleChangeView(!view)}
                        children={view ? 'Показать всю неделю' : 'Показать один день'}
                        orange
                    />

                    {
                        view
                            ? (
                                <>
                                    <div className='schedule__header'>
                                        {
                                            WEEKDAYS.map((wd, index) => (
                                                <div
                                                    key={wd}
                                                    className={[ 'item', index === day && 'active' ].filter(Boolean).join(' ')}
                                                    onClick={() => index !== day && this.handleChangeDay(index)}
                                                >
                                                    {weekdays.ru[wd]}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='schedule__body'>
                                        {
                                            list[day] && list[day].map(i => (
                                                <div key={i.id} className='schedule__body__item'>
                                                    <div className={`schedule__body__category schedule__body__category--${i.category}`}/>
                                                    <div className='schedule__body__time'>{hhmm(+i.time)} - {hhmm(+i.time + +i.duration)}</div>
                                                    <div className='schedule__body__title'>{i.title}</div>
                                                    <Schedule.Master className='schedule__body__master' disabled={i.disabled} alternate={i.alternate} master={i.master}/>
                                                    <div className='schedule__body__level'>{i.level}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            ) : (
                                <table className='schedule__table'>
                                    <thead>
                                    <tr>
                                        <td className='schedule__table__time-header'><TimeSVG/></td>
                                        {
                                            WEEKDAYS.map(wd => (<td key={wd}>{weekdays.ru[wd]}</td>))
                                        }
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        table.map((row, index) => (
                                            <tr className='schedule__table__row' key={index}>
                                                <td className='schedule__table__time-cell'>{index}</td>
                                                {
                                                    WEEKDAYS.map((_, day) => (
                                                        <td className='schedule__table__cell' key={day}>
                                                            {
                                                                row[day] && row[day].map(card => (
                                                                    <div key={card.id}
                                                                         className='schedule__table__cell__item'>
                                                                        <div className={`schedule__table__cell__category schedule__table__cell__category--${card.category}`}/>
                                                                        <div className='schedule__table__cell__time'>{hhmm(+card.time)} - {hhmm(+card.time + +card.duration)}</div>
                                                                        <div className='schedule__table__cell__name'>
                                                                            <div className='schedule__table__cell__name__subject'>{card.title}</div>
                                                                            <Schedule.Master
                                                                                className='schedule__table__cell__name__coach'
                                                                                disabled={card.disabled}
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
                            )
                    }
                </div>
            </Layout>
        )
    }
}


Schedule.getInitialProps = async function() {
    const res = await fetch('https://om-rest.herokuapp.com/lessons?sort=day'); // disabled:false
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
    return { list };
};
