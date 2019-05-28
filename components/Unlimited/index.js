import React from 'react';
import fetch from 'isomorphic-unfetch';
import ReCAPTCHA from 'react-google-recaptcha';
import Input from '../Input';
import Button from '../Button';

import css from './styles.styl';


export default class Unlimited extends React.Component {
    state = {
        name: undefined,
        phone: undefined,
        recaptcha: undefined,
    };

    handleSubmit = () => {
        const { name, phone } = this.state;
        this.setState({ name: undefined, phone: undefined, recaptcha: undefined }, async () => {
            await fetch('https://om-rest.herokuapp.com/feedbacks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, type: 'unlimited week', content: 'I wan\'t unlimited week' }),
            });

            this.$name.value = '';
            this.$phone.value = '';
            alert('Вы успешно записались на акцию "Безлимитная неделя". В скором времени мы с Вами свяжемся для подтверждения участия!');
            this.$recaptcha.reset();
        });
    };

    handleFocus = () => {
        if (!this.$phone.value) setTimeout(() => { this.$phone.value = '+7'; }, 0);
    };

    handleBlur = () => {
        if (this.$phone.value === '+7') this.$phone.value = '';
    };

    handleKeyDown = (e) => {
        const { value } = this.$phone;
        if ([ 9/* tab */, 37/* left */, 39/* right */, 8/* backspace */ ].includes(e.keyCode)) return;
        if (value && e.key === '+' || '1234567890+'.indexOf(e.key) === -1 || value.length > 10) { e.preventDefault(); }
    };

    handleChange = ({ name, value }) => this.setState({ [name]: value });

    handleRecaptcha = recaptcha => this.setState({ recaptcha });

    render() {
        const { className } = this.props;
        const { name, phone, recaptcha } = this.state;
        return (
            <div className={[ css.unlimited, className ].filter(Boolean).join(' ')}>
                <div className={css.info}>
                    <div className={css.paragraph}>Стоимость ₽ <strong>900</strong></div>
                    <div className={css.paragraph}>Акция актуальна, если вы у нас впервые</div>
                    <div className={css.paragraph}>Действует на все регулярные групповые занятия</div>
                    <div className={css.paragraph}>Мы будем благодарны за любой честный отзыв в удобном для вас сервисе (google карты, яндекс карты, facebook)</div>
                </div>
                <div className={css.form}>
                    <Input
                        ref={r => this.$name = r}
                        type="text"
                        name="name"
                        title="Имя, Фамилия"
                        placeholder="Имя, Фамилия"
                        onChange={this.handleChange}
                    />
                    <Input
                        ref={r => this.$phone = r}
                        type="text"
                        name="phone"
                        title="+7XXXXXXXXXX"
                        placeholder="Телефон"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.handleBlur}
                        onFocus={this.handleFocus}
                    />
                    <ReCAPTCHA
                        ref={r => this.$recaptcha = r}
                        sitekey="6Le49wYTAAAAAOF2yXK91DOjY9RHcPLHwOYRtyjj"
                        onChange={this.handleRecaptcha}
                    />
                    {/* <InputMask ref={r => this.$phone = r} type="text" name="phone" title="Телефон" placeholder="Телефон" onChange={this.handleChange} mask="+4\9 99 999 99" maskChar=" " />; */}
                    <Button
                        type="submit"
                        name="submit"
                        orange
                        onClick={this.handleSubmit}
                        disabled={!name || typeof phone !== 'string' || phone.length < 10 || phone.length > 11 || !recaptcha}
                    >
                        Участвовать
                    </Button>
                </div>
            </div>
        );
    }
}
