import React  from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../../components/Layout/index'
import Button from '../../components/Button';
import TimeSVG from '../../static/svg/time.svg';
import css from './styles.styl';

const WEEKDAYS = [ 'sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat' ];
const weekdays = { 'ru': { sun: 'Вс', mon: 'Пн', tue: 'Вт', wed: 'Ср', thurs: 'Чт', fri: 'Пт', sat: 'Сб' } };
const hhmm = minutes => ((mm, minutes) => `${`0${(minutes - mm)/60}`.slice(-2)}:${`0${mm}`.slice(-2)}`)(minutes % 60, minutes);


export default class Schedule extends React.Component {
    static Master = ({ className, disabled, alternate, master }) => {
        const classNames = name => [ className, css[name] ].join(' ');
        if (disabled) return <div className={classNames('disabled')}>Отмена</div>;
        if (alternate) return <div className={classNames('alternate')}><span>{master}</span> → <span>{alternate}</span></div>;
        if (master) return <div className={classNames('master')}>{master}</div>;
        return <div className={classNames('blank')}>Не назначен</div>;
    };
    state = {
        day: new Date().getDay(),
        view: true,
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
                <div className={css.schedule}>
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
                                            WEEKDAYS.map((wd, index) => (
                                                <div
                                                    key={wd}
                                                    className={[ css.item, index === day && css.active ].filter(Boolean).join(' ')}
                                                    onClick={() => index !== day && this.handleChangeDay(index)}
                                                >
                                                    {weekdays.ru[wd]}
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
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ) : (
                                <table className={css.table}>
                                    <thead>
                                    <tr className={css.header}>
                                        <td className={css.time}><TimeSVG/></td>
                                        {
                                            WEEKDAYS.map((wd, index) => (
                                                <td
                                                    key={wd}
                                                    onClick={() => this.setState({ day: index })}
                                                    className={[ css.item, index === day && css.active ].filter(Boolean).join(' ')}
                                                >
                                                    {weekdays.ru[wd]}
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
                                                    WEEKDAYS.map((_, d) => (
                                                        <td className={css.cell} key={d}>
                                                            {
                                                                row[d] && row[d].map(i => (
                                                                    <div key={i.id} className={css.cellItem}>
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
