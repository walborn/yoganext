import React  from 'react';
import CursorSVG from '../../static/svg/cursor.svg';
import Input from '../Input';
import Button from '../Button';
import './styles.scss';
import fetch from 'isomorphic-unfetch';


export default class Unlimited extends React.PureComponent {
    // handleSubmit = () => {
    //     fetch('/bear', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ hungry: true })
    //     }).then( r => {
    //         open(r.headers.get('location'));
    //         return r.json();
    //     })
    // }
    render() {
        const { className } = this.props;
        return (
            <div className={`unlimited${className ? ` ${className}` : ''}`}>
                <div className="unlimited__info">
                    <p className="unlimited__paragraph"><CursorSVG className="unlimited__cursor" />Оплатите ₽<strong>900</strong></p>
                    <p className="unlimited__paragraph"><CursorSVG className="unlimited__cursor"/>Сходите на первое занятие</p>
                    <p className="unlimited__paragraph"><CursorSVG className="unlimited__cursor" />Оставьте честный отзыв в любом удобном сервисе (google карты, яндекс карты, facebook)</p>
                    <p>* Акция актуальна, если вы у нас впервые</p>
                    <p>* Действует на все регулярные групповые занятия</p>
                    <p>* Успейте воспользоваться акцией до <strong>30</strong> апреля</p>
                </div>
                <div className="unlimited__form">
                    <div className="unlimited__form__header">Заполните форму, чтобы получить безлимитную неделю</div>
                    <Input type="text" name="name" title="Имя, Фамилия" placeholder="Имя, Фамилия" onChange={this.handleChange} />
                    <Input type="text" name="phone" title="Телефон" placeholder="Телефон" onChange={this.handleChange} />
                    <Button type="submit" name="submit" orange>Отправить</Button>
                </div>
            </div>
        );
    }
}

// Unlimited.getInitialProps = async function() {
//     const res = await fetch('http://0.0.0.0:9000/events');
//     const events = await res.json();
//     const list = events.reduce((res, item) => ({...res, [item.date]: [...(res[item.date] || []), item]}), {});
//     const dates = Object.keys(list);
//     const minDate = dates.slice(1).reduce((min, next) => {
//         if (min.slice(6) < next.slice(6)) return min;
//         if (min.slice(6) > next.slice(6)) return next;
//         if (min.slice(3, 5) < next.slice(3, 5)) return min;
//         if (min.slice(3, 5) > next.slice(3, 5)) return next;
//         if (min.slice(0, 2) < next.slice(0, 2)) return min;
//         if (min.slice(0, 2) > next.slice(0, 2)) return next;
//         return min;
//     }, dates[0]);
//
//     return { list, minDate };
// };
