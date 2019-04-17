import React  from 'react';
import CursorSVG from '../../static/svg/cursor.svg';
import Input from '../Input';
import Button from '../Button';
import './styles.scss';
import fetch from 'isomorphic-unfetch';


export default class Unlimited extends React.Component {
    state = {
        name: undefined,
        phone: undefined,
    };
    handleSubmit = async () => {
        const { name, phone } = this.state;
        const res = await fetch('https://om-rest.herokuapp.com/feedbacks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, type: 'unlimited week', content: 'I wan\'t unlimited week'  })
        });

        this.setState({ name: undefined, phone: undefined });
        this.$name.value = '';
        this.$phone.value = '';
        alert('Вы успешно записались на акцию "Безлимитная неделя". В скором времени мы с Вами свяжемся для подтверждения участия!')
    };
    handleChange = ({ name, value }) => this.setState({ [name]: value });
    render() {
        const { className } = this.props;
        const { name, phone } = this.state;
        return (
            <div className={`unlimited${className ? ` ${className}` : ''}`}>
                <div className="unlimited__info">
                    <div className="unlimited__paragraph">Стоимость ₽ <strong>900</strong></div>
                    <div className="unlimited__paragraph">Акция актуальна, если вы у нас впервые</div>
                    <div className="unlimited__paragraph">Действует на все регулярные групповые занятия</div>
                    <div className="unlimited__paragraph">Мы будем благодарны за любой честный отзыв в удобном для вас сервисе (google карты, яндекс карты, facebook)</div>
                </div>
                <div className="unlimited__form">
                    {/*<div className="unlimited__form__header">Заявка на участие</div>*/}
                    <Input ref={r => this.$name = r} type="text" name="name" title="Имя, Фамилия" placeholder="Имя, Фамилия" onChange={this.handleChange} />
                    <Input ref={r => this.$phone = r} type="text" name="phone" title="Телефон" placeholder="Телефон" onChange={this.handleChange} />
                    <Button
                        type="submit"
                        name="submit"
                        orange
                        onClick={this.handleSubmit}
                        disabled={!name || !phone}
                    >
                        Участвовать
                    </Button>
                </div>
            </div>
        );
    }
}
