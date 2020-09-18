import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { PropTypes } from 'prop-types';

import { ScreenView } from 'utilities/components/screen/component/view';
import { HeadlineView } from 'utilities/components/headline/component/view';
import { Field } from 'utilities/components/field/component';
import { SubmitView } from 'utilities/components/submit/component/view';

import { setPersonalDataRequest } from '../requests/set-personal-data';

import './view.scss';

export const PersonalDataView = ({ data, setPersonalData, setError }) => (
    <ScreenView title="personal-data" data={ data }>
        <h1 className="main__headline">Uzupełnij dane, aby dostać kredyt.</h1>
        <p className="main__description">Następnie sprawdzimy, czy spełniasz wszystkie kryteria aby dostąpić tego zaszczytu.</p>
        <HeadlineView text="Podaj numer, na który dostaniesz kod weryfikacyjny." />
        <Formik
            initialValues={{
                phoneNumber: data.customer.phoneNumber
            }}
            initialTouched={{
                phoneNumber: true
            }}
        >
            <Field
                label="Numer telefonu"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                disabled
            />
        </Formik>
        <p className="main__subheadline">Jesteś tu nowy?</p>
        <HeadlineView text="Podaj swoje dane." isUnderlined={ false } />
        <Formik
            initialValues={{
                firstName: data.customer.firstName,
                lastName: data.customer.lastName,
                pesel: ''
            }}
            initialTouched={{
                firstName: data.customer.firstName,
                lastName: data.customer.lastName
            }}
            validationSchema={ Yup.object({
                firstName: Yup
                    .string()
                    .required('Imię jest wymagane'),
                lastName: Yup
                    .string()
                    .required('Nazwisko jest wymagane'),
                pesel: Yup
                    .string()
                    .matches(/^\d{11}$/, 'PESEL jest niepoprawny')
                    .required('PESEL jest wymagany')
            }) }
            onSubmit={ (values, { setSubmitting, setErrors }) => {
                setPersonalDataRequest(values.firstName, values.lastName, values.pesel)
                    .then(() => {
                        setPersonalData(values.firstName, values.lastName, values.pesel);
                    })
                    .catch((error) => {
                        if ((error.response.status === 400) || (error.response.status === 409)) {
                            setErrors({
                                firstName: true,
                                lastName: true,
                                pesel: true
                            });
                            setSubmitting(false);
                        } else {
                            setError('Coś się stanęło!');
                        }
                    });
            } }
        >
            {
                ({
                    dirty,
                    isValid,
                    isSubmitting
                }) => (
                    <Form>
                        <Field
                            label="Imię"
                            id="firstName"
                            name="firstName"
                            type="text"
                        />
                        <Field
                            label="Nazwisko"
                            id="lastName"
                            name="lastName"
                            type="text"
                        />
                        <Field
                            label="PESEL"
                            id="pesel"
                            name="pesel"
                            type="text"
                            minLength="11"
                            maxLength="11"
                        />
                        <SubmitView dirty={ dirty } isValid={ isValid } isSubmitting={ isSubmitting } />
                    </Form>
                )
            }
        </Formik>
    </ScreenView>
);

PersonalDataView.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    setPersonalData: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};