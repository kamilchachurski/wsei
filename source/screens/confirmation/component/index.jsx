import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ConfirmationView } from './view';

import { confirmPayment } from 'utilities/confirm-payment';

export const Confirmation = ({
    data,
    incrementCurrentStep,
    setError
}) => {
    const [isSubmitting, setSubmitting] = useState(false);

    const handleClick = () => {
        setSubmitting(true);
        confirmPayment(incrementCurrentStep, setError);
    };

    return (<ConfirmationView data={ data } isSubmitting={ isSubmitting } handleClick={ handleClick } />);
};

Confirmation.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    incrementCurrentStep: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};