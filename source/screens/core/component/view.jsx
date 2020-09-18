import React from 'react';
import PropTypes from 'prop-types';

import { ErrorView } from 'screens/error/component/view';
import { LoaderView } from 'screens/loader/component/view';
import { PhoneNumber } from 'screens/phone-number/component';
import { PersonalData } from 'screens/personal-data/component';
import { SmsCodeView } from 'screens/sms-code/component/view';
import { Address } from 'screens/address/component';
import { Confirmation } from 'screens/confirmation/component';
import { CompleteView } from 'screens/complete/component/view';

export const CoreView = ({
    status,
    data,
    incrementCurrentStep,
    setData,
    setError
}) => (
    <>
        {
            (status.error)
                ? (<ErrorView headline={ status.error } />)
                : (status.isLoading)
                    ? (<LoaderView />)
                    : (status.dueSteps[status.currentStep] === 'phoneNumber')
                        ? (
                            <PhoneNumber
                                data={ data }
                                incrementCurrentStep={ incrementCurrentStep }
                                setData={ setData }
                                setError={ setError }
                            />
                        )
                        : (status.dueSteps[status.currentStep] === 'personalData')
                            ? (
                                <PersonalData
                                    data={ data }
                                    incrementCurrentStep={ incrementCurrentStep }
                                    setData={ setData }
                                    setError={ setError }
                                />
                            )
                            : (status.dueSteps[status.currentStep] === 'smsCode')
                                ? (
                                    <SmsCodeView
                                        isConfirmation={ ((status.dueSteps.length - 2) === status.currentStep) }
                                        data={ data }
                                        incrementCurrentStep={ incrementCurrentStep }
                                        setError={ setError }
                                    />
                                )
                                : (status.dueSteps[status.currentStep] === 'address')
                                    ? (
                                        <Address
                                            data={ data }
                                            incrementCurrentStep={ incrementCurrentStep }
                                            setData={ setData }
                                            setError={ setError }
                                        />
                                    )
                                    : (status.dueSteps[status.currentStep] === 'confirmation')
                                        ? (
                                            <Confirmation data={ data } incrementCurrentStep={ incrementCurrentStep } setError={ setError } />
                                        )
                                        : (<CompleteView data={ data } />)
        }
    </>
);

CoreView.propTypes = {
    status: PropTypes.instanceOf(Object).isRequired,
    data: PropTypes.instanceOf(Object).isRequired,
    incrementCurrentStep: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};