import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Input from '../Input';
import Button from '../Button';
import css from './styles.styl';


export default class Subscribe extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    state = {
        name: undefined,
        phone: undefined,
    };

    handleSubmit = () => {
        const { name, phone } = this.state;
        this.setState({ name: undefined, phone: undefined }, async () => {
            await fetch('https://om-rest.herokuapp.com/feedbacks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, type: 'subscribe', content: 'I\'m waiting for a call back' }),
            });

            this.$name.value = '';
            this.$phone.value = '';
            alert('Вы успешно записались. В скором времени мы Вам перезвоним!');
        });
    };

    handleKeyDown = (e) => {
        const { value } = this.$phone;
        if ([ 9/* tab */, 37/* left */, 39/* right */, 8/* backspace */ ].includes(e.keyCode)) return;
        if (value && e.key === '+' || '0123456789 ()-'.indexOf(e.key) === -1 || value.length > 20) { e.preventDefault(); }
    };

    handleChange = ({ name, value }) => this.setState({ [name]: value });

    render() {
        const { className } = this.props;
        const { name, phone } = this.state;
        return (
            <div className={[ css.subscribe, className ].filter(Boolean).join(' ')}>
                <div className={css.image}><img src="/static/girl.png" alt="" /></div>
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
                    title="+79999999999"
                    placeholder="Телефон"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
                <Button
                    type="submit"
                    name="submit"
                    orange
                    onClick={this.handleSubmit}
                    disabled={!name || typeof phone !== 'string' || phone.length < 10 || phone.length > 21}
                >
                    Запрос на обратный звонок
                </Button>
            </div>
        );
    }
}
