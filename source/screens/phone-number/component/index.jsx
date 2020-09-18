import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { PhoneNumberView } from './view';

export const PhoneNumber = ({
    data,
    incrementCurrentStep,
    setData,
    setError
}) => {
    const [isVisible, setVisibility] = useState(false);

    const toggleVisibility = (event) => {
        event.preventDefault();

        setVisibility((previousVisibility) => (!previousVisibility));
    };

    const setPhoneNumber = (phoneNumber) => {
        setData((previousData) => ({
            ...previousData,
            customer: {
                ...previousData.customer,
                phoneNumber
            }
        }));
        incrementCurrentStep();
    };

    return (
        <PhoneNumberView
            data={ data }
            isVisible={ isVisible }
            toggleVisibility={ toggleVisibility }
            setPhoneNumber={ setPhoneNumber }
            setError={ setError }
        />
    );
};

PhoneNumber.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    incrementCurrentStep: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};