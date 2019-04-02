import React  from 'react';
import CursorSVG from '../static/svg/cursor.svg';


export default class Unlimited extends React.PureComponent {
    render() {
        const { className } = this.props;
        return (
            <div className={`unlimited ${className}`}>
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
                    <input type="text" name="name" title="Имя, Фамилия" placeholder="Имя, Фамилия" onChange={this.handleChange} />
                    <input type="text" name="phone" title="Телефон" placeholder="Телефон" onChange={this.handleChange} />
                    <button type="submit" name="submit">Отправить</button>
                </div>
            </div>
        );
    }
}
