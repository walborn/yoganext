import React from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';


const Subscribe = styled.div`
  position: relative;
  display: block;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  > * {
    margin-bottom: 10px;
  }
`;

export default ({ className }) => {
    const [ name, setName ] = React.useState();
    const [ phone, setPhone ] = React.useState();

    let $name = React.createRef();
    let $phone = React.createRef();

    const handleSubmit = async () => {
        setName(undefined);
        setPhone(undefined);

        await fetch('https://om-rest.herokuapp.com/feedbacks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, type: 'subscribe', content: 'I\'m waiting for a call back' }),
        });

        $name.value = '';
        $phone.value = '';
        alert('Вы успешно записались. В скором времени мы Вам перезвоним!');
    };

    const handleKeyDown = (e) => {
        const { value } = $phone;
        if ([ 9/* tab */, 37/* left */, 39/* right */, 8/* backspace */ ].includes(e.keyCode)) return;
        if (value && (e.key === '+' || value.length > 20) || '+0123456789 ()-'.indexOf(e.key) === -1) { e.preventDefault(); }
    };

    const disabled = !name || typeof phone !== 'string' || phone.length < 10 || phone.length > 21;
    return (
        <Subscribe className={className}>
            <Input
                ref={r => $name = r}
                type="text"
                name="name"
                title="Имя, Фамилия"
                placeholder="Имя, Фамилия"
                onChange={({ value }) => setName(value)}
            />
            <Input
                ref={r => $phone = r}
                type="text"
                name="phone"
                title="+79999999999"
                placeholder="Телефон"
                onChange={({ value }) => setPhone(value)}
                onKeyDown={handleKeyDown}
            />
            <Button
                type="submit"
                name="submit"
                orange
                onClick={handleSubmit}
                disabled={disabled}
            >
                Запрос на обратный звонок
            </Button>
        </Subscribe>
    );
}
