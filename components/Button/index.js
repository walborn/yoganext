import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.styl';


export default class Button extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        children: PropTypes.node,
        type: PropTypes.string,
    };

    static defaultProps = {
        type: 'button',
    };

    render() {
        const { className, type, children, disabled, onClick, ...props } = this.props;
        const color = [ 'green', 'blue', 'red', 'orange', 'silver' ].find(i => !!props[i]);
        return (
            <button
                type={type}
                className={[ css.button, className, disabled && css.disabled, css[color] ].filter(Boolean).join(' ')}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }
}
