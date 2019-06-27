import React from 'react';
import PropTypes from 'prop-types';
import ArrowSVG from './arrow.svg';
import css from './styles.styl';


export default class Slider extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.string),
    };

    state = {
        current: 0,
        list: [ this.props.list[this.props.list.length - 1], this.props.list[0], this.props.list[1] ],
        style: { transform: 'translateX(-100%)' },
    };

    componentDidMount() { this.interval = setInterval(this.handleStep(1), 10000); }

    componentWillUnmount() { clearInterval(this.interval); }

    handleStep = step => (e) => {
        if (e) e.preventDefault();
        const { list } = this.props;
        const { current } = this.state;
        const len = list.length;
        const next = (current + 1) % len;
        const prev = (current + len - 1) % len;
        const style = { transform: `translateX(${-100 * (1 + step)}%)`, transition: 'transform ease-out 0.45s' };
        this.setState({ list: [ list[prev], list[current], list[next] ], style, current: step === 1 ? next : prev }, () => {
            setTimeout(() => this.setState(s => ({
                list: [ list[(s.current + len - 1) % len], list[s.current], list[(s.current + 1) % len] ],
                style: { transform: 'translateX(-100%)' },
            })), 450);
        });
    };

    render() {
        const { className } = this.props;
        const { list, style } = this.state;
        return (
            <div className={css.slider}>
                <ul className={[ className, css.list ].filter(Boolean).join(' ')} style={style}>
                    {
                        list.map((i, index) => (
                            <li className={css.item} key={i}>
                                <img src={i} alt="" />
                            </li>
                        ))
                    }
                </ul>
                <div className={[ css.arrow, css.left ].join(' ')} onClick={this.handleStep(-1)}><ArrowSVG /></div>
                <div className={[ css.arrow, css.right ].join(' ')} onClick={this.handleStep(1)}><ArrowSVG /></div>
            </div>
        );
    }
}
