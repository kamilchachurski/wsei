import React from 'react';
import PropTypes from 'prop-types';

import { AddressView } from './view';

export const Address = ({
    data,
    incrementCurrentStep,
    setData,
    setError
}) => {
    const setAddress = (street, postcode, city) => {
        setData((previousData) => ({
            ...previousData,
            address: {
                ...previousData.address,
                street,
                postcode,
                city
            }
        }));
    };

    return (
        <AddressView
            data={ data }
            setAddress={ setAddress }
            incrementCurrentStep={ incrementCurrentStep }
            setError={ setError }
        />
    );
};

Address.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    incrementCurrentStep: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};