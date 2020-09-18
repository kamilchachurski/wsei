import React from 'react';
import PropTypes from 'prop-types';

import { PersonalDataView } from './view';

export const PersonalData = ({
    data,
    incrementCurrentStep,
    setData,
    setError
}) => {
    const setPersonalData = (firstName, lastName, pesel) => {
        setData((previousData) => ({
            ...previousData,
            customer: {
                ...previousData.customer,
                firstName,
                lastName,
                pesel
            }
        }));
        incrementCurrentStep();
    };

    return (<PersonalDataView data={ data } setPersonalData={ setPersonalData } setError={ setError } />);
};

PersonalData.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    incrementCurrentStep: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};