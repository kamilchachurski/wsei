import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Fingerprint from 'fingerprintjs2';
import Axios from 'axios';

import { CoreView } from './view';

import { steps } from 'utilities/steps';
import { getTokenRequest } from '../requests/get-token';
import { getDataRequest } from '../requests/get-data';
import { secureLocalStorage } from 'utilities/secure-local-storage';

export const Core = () => {
    const [status, setStatus] = useState({
        dueSteps: steps.map((currentValue) => (currentValue.name)),
        currentStep: 0,
        isLoading: true,
        error: ''
    });
    const [data, setData] = useState({
        settings: {
            skipAddressVerification: false,
            skipPhoneNumberVerification: false,
            deviceFingerPrint: ''
        },
        transaction: {
            id: useParams().transaction,
            amount: 0,
            shopName: ''
        },
        customer: {
            type: '',
            firstName: '',
            lastName: '',
            pesel: '',
            phoneNumber: ''
        },
        address: {
            street: '',
            postcode: '',
            city: ''
        }
    });

    const setDueSteps = (restrictions) => {
        let { dueSteps } = status;

        steps.forEach((step) => {
            Object.keys(step).forEach((key) => {
                if ((restrictions[key] !== undefined) && (step[key] !== restrictions[key])) {
                    dueSteps = dueSteps.filter((currentValue) => (currentValue !== step.name));
                }
            });
        });

        setStatus((previousStatus) => ({
            ...previousStatus,
            dueSteps
        }));
    };

    const incrementCurrentStep = () => {
        setStatus((previousStatus) => ({
            ...previousStatus,
            currentStep: previousStatus.currentStep + 1
        }));
    };

    const personaliseData = (responseData) => {
        setData((previousData) => ({
            settings: {
                ...previousData.settings,
                skipPhoneNumberVerification: responseData.settings[0].skipPhoneNumberVerification,
                skipAddressVerification: responseData.settings[0].skipAddressVerification
            },
            transaction: {
                ...previousData.transaction,
                amount: responseData.transaction[0].amount,
                shopName: responseData.transaction[0].shopName
            },
            customer: {
                ...previousData.customer,
                type: responseData.customer[0].type,
                firstName: responseData.customer[0].firstName,
                lastName: responseData.customer[0].lastName,
                pesel: responseData.customer[0].pesel,
                phoneNumber: responseData.customer[0].phoneNumber
            },
            address: {
                ...previousData.address,
                street: responseData.address[0].street,
                postcode: responseData.address[0].postcode,
                city: responseData.address[0].city
            }
        }));

        setDueSteps({
            skipAddressVerification: Boolean(parseInt(responseData.settings[0].skipAddressVerification, 10)),
            skipPhoneNumberVerification: Boolean(parseInt(responseData.settings[0].skipPhoneNumberVerification, 10)),
            type: responseData.customer[0].type
        });
    };

    const setFingerprint = (fingerprint) => {
        setData((previousData) => ({
            ...previousData,
            settings: {
                ...previousData.settings,
                deviceFingerPrint: fingerprint
            }
        }));
    };

    const setLoading = (isLoading) => {
        setStatus((previousStatus) => ({
            ...previousStatus,
            isLoading
        }));
    };

    const setError = (error) => {
        setStatus((previousStatus) => ({
            ...previousStatus,
            error
        }));
    };

    const setAuthentication = () => {
        const token = secureLocalStorage.get('token');

        if (token.transaction === data.transaction.id) {
            Axios.defaults.headers.common.Authorization = `Bearer ${ token.access }`;

            getDataRequest()
                .then((response) => {
                    personaliseData(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Coś się stanęło!');
                });
        } else {
            getTokenRequest(data.transaction.id)
                .then((response) => {
                    Axios.defaults.headers.common.Authorization = `Bearer ${ response.data.token[0].token }`;

                    secureLocalStorage.set('token', {
                        access: response.data.token[0].token,
                        transaction: data.transaction.id
                    });

                    personaliseData(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Coś się stanęło!');
                });
        }
    };

    useEffect(() => {
        Axios.defaults.baseURL = process.env.API_URL;

        let fingerprint = secureLocalStorage.get('fingerprint');

        if (fingerprint) {
            console.log(fingerprint);
            setFingerprint(fingerprint);
            setAuthentication();
        } else {
            setTimeout(() => {
                Fingerprint.get((components) => {
                    fingerprint = Fingerprint.x64hash128(components.map((currentValue) => (currentValue.value)).join(''), 31);

                    secureLocalStorage.set('fingerprint', fingerprint);

                    setFingerprint(fingerprint);
                    setAuthentication();
                });
            }, 1000);
        }
    }, []);

    return (
        <CoreView
            status={ status }
            data={ data }
            incrementCurrentStep={ incrementCurrentStep }
            setData={ setData }
            setError={ setError }
        />
    );
};