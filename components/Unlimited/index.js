import React  from 'react';
import CursorSVG from '../../static/svg/cursor.svg';
import Input from '../Input';
import Button from '../Button';
import './styles.scss';


export default class Unlimited extends React.PureComponent {
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
