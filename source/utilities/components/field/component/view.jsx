import React from 'react';
import PropTypes from 'prop-types';

import './view.scss';

export const FieldView = ({
    label,
    explanation,
    isVisible,
    children,
    props,
    input,
    touched,
    error,
    toggleVisibility,
    handleChange
}) => {
    switch (props.type) {
        case 'checkbox':
            return (
                <div className="field">
                    <div className={ `field__checkbox${ (touched && error) ? ('--error') : ('') }` }>
                        <label className="checkbox__label" htmlFor={ props.id }>
                            <input
                                className="checkbox__input"
                                autoComplete="off"
                                required
                                { ...props }
                                { ...input }
                                onChange={ handleChange }
                            />
                            <span className="checkbox__ballot-box" />
                            <p>
                                { label }
                                { ' ' }
                                {
                                    (explanation)
                                        && (<button className="checkbox__toggle" type="button" onClick={ toggleVisibility }>{ (isVisible) ? (<>Zwiń &#9652;</>) : (<>Rozwiń &#9662;</>) }</button>)
                                }
                                { children }
                            </p>
                        </label>
                        {
                            (explanation && isVisible)
                                && (<p className="checkbox__explanation">{ explanation }</p>)
                        }
                    </div>
                    {
                        (touched && error)
                            && (<p className="field__error">{ error }</p>)
                    }
                </div>
            );
        default:
            return (
                <div className="field">
                    <div className={ `field__common${ (touched && error) ? ('--error') : ('') }` }>
                        <input className="common__input" autoComplete="off" required { ...props } { ...input } />
                        <label className="common__label" htmlFor={ props.id }>{ label }</label>
                    </div>
                    {
                        (touched && error)
                            && (<p className="field__error">{ error }</p>)
                    }
                </div>
            );
    }
};

FieldView.defaultProps = {
    id: '',
    type: '',
    error: ''
};

FieldView.propTypes = {
    label: PropTypes.string.isRequired,
    explanation: PropTypes.node.isRequired,
    isVisible: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    props: PropTypes.instanceOf(Object).isRequired,
    id: PropTypes.string,
    type: PropTypes.string,
    input: PropTypes.instanceOf(Object).isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    toggleVisibility: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};