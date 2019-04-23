import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './styles.styl';


export default class Input extends Component {
    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        placeholder: PropTypes.string,
        title: PropTypes.string,
        disabled: PropTypes.bool,
        failure: PropTypes.bool,
        readOnly: PropTypes.bool,
        cleaning: PropTypes.bool,
        onChange: PropTypes.func,
        onClear: PropTypes.func,
        onDocumentClick: PropTypes.func,
    };
    static defaultProps = {
        type: 'text',
        cleaning: true,
    };
    state = {
        value: this.props.value,
    };
    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillReceiveProps(nextProps) {
        const { value } = nextProps;
        if (value !== this.props.value) this.setState({ value });
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }
    get value() {
        return this.state.value;
    }
    set value(value) {
        this.setState({ value });
    }
    handleChange = ({ value }) => {
        const { onChange } = this.props;
        this.setState({ value }, () => typeof onChange === 'function' && onChange({ value, name: this.props.name }));
    };
    handleDocumentClick = (event) => {
        const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn));
        const hitting = closest(event.target, el => el === this.$parent);
        if (hitting && typeof this.$input.focus === 'function') this.$input.focus();
    };
    render() {
        const { className, title, placeholder, readOnly, disabled, cleaning, failure, onDocumentClick, ...props } = this.props;
        const { value } = this.state;
        const cleaner = value && cleaning && !readOnly && !disabled;
        return (
            <div
                ref={(r) => { this.$parent = r; }}
                className={[
                    css.wrapper,
                    className,
                    disabled && css.disabled,
                    readOnly && css.readonly,
                    failure && css.failure,
                    value && title && css.withTitle,
                    cleaner && css.withCleaner,
                ].filter(Boolean).join(' ')}

            >
                <input
                    {...props}
                    ref={(r) => { this.$input = r; }}
                    className={css.input}
                    value={value}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    onChange={e => this.handleChange(e.target)}
                />
                <div className={css.title}>
                    {value && title}
                </div>
            </div>
        );
    }
}
