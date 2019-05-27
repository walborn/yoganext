import React from 'react';
import PropTypes from 'prop-types';
import LoadingSVG from './loading.svg';
import css from './styles.styl';


export default class Loader extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
    };

    render() {
        const { className, children, ...props } = this.props;

        return (
            <div {...props} className={[ className, css.loader ].filter(Boolean).join(' ')}>
                <div>
                    <div>
                        <LoadingSVG id="loader-circle" />
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}
