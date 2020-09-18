import React from 'react';
import PropTypes from 'prop-types';

import spinner from 'assets/images/spinner--white.svg';

import './view.scss';

export const SubmitView = ({
    text,
    isInitialDisabled,
    dirty,
    isValid,
    isSubmitting,
    handleClick
}) => (
    <button
        className="submit"
        type="submit"
        disabled={ (isInitialDisabled) ? (!dirty || !isValid || isSubmitting) : (isInitialDisabled || isSubmitting) }
        onClick={ handleClick }
    >
        { text }
        {
            (isSubmitting)
                && (<img className="submit__spinner" src={ spinner } alt="spinner" />)
        }
    </button>
);

SubmitView.defaultProps = {
    text: 'Dalej',
    isInitialDisabled: true,
    dirty: false,
    isValid: false,
    handleClick: () => {}
};

SubmitView.propTypes = {
    text: PropTypes.string,
    isInitialDisabled: PropTypes.bool,
    dirty: PropTypes.bool,
    isValid: PropTypes.bool,
    isSubmitting: PropTypes.bool.isRequired,
    handleClick: PropTypes.func
};