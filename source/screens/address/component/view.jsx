import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { ScreenView } from 'utilities/components/screen/component/view';
import { HeadlineView } from 'utilities/components/headline/component/view';
import { Field } from 'utilities/components/field/component';
import { SubmitView } from 'utilities/components/submit/component/view';

import { setAddressRequest } from '../requests/set-address';
import { confirmPayment } from 'utilities/confirm-payment';

import './view.scss';

export const AddressView = ({
    data,
    setAddress,
    incrementCurrentStep,
    setError
}) => (
    <ScreenView title="address" data={ data }>
        <p className="main__subheadline">
            { data.customer.firstName }
            , jeszcze tylko to!
        </p>
        <HeadlineView text="Podaj adres zamieszkania." />
        <Formik
            initialValues={{
                street: '',
                postcode: '',
                city: ''
            }}
            validationSchema={ Yup.object({
                street: Yup
                    .string()
                    .matches(/\d/, 'Numer jest wymagany')
                    .required('Ulica i numer jest wymagana'),
                postcode: Yup
                    .string()
                    .matches(/^\d{2}-\d{3}$/, 'Kod pocztowy jest niepoprawny (XX-XXX)')
                    .required('Kod pocztowy jest wymagany'),
                city: Yup
                    .string()
                    .required('Miasto jest wymagane')
            }) }
            onSubmit={ (values) => {
                setAddressRequest(values.street, values.postcode, values.city)
                    .then(() => {
                        setAddress(values.street, values.postcode, values.city);
                        confirmPayment(incrementCurrentStep, setError);
                    })
                    .catch(() => {
                        setError('Coś się stanęło!');
                    });
            } }
        >
            {
                ({ dirty, isValid, isSubmitting }) => (
                    <Form>
                        <Field
                            label="Ulica i numer"
                            id="street"
                            name="street"
                            type="text"
                        />
                        <Field
                            label="Kod pocztowy"
                            id="postcode"
                            name="postcode"
                            type="text"
                            minLength="6"
                            maxLength="6"
                        />
                        <Field
                            label="Miasto"
                            id="city"
                            name="city"
                            type="text"
                        />
                        <SubmitView
                            text="Zadłuż się"
                            dirty={ dirty }
                            isValid={ isValid }
                            isSubmitting={ isSubmitting }
                        />
                    </Form>
                )
            }
        </Formik>
    </ScreenView>
);

AddressView.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    setAddress: PropTypes.func.isRequired,
    incrementCurrentStep: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};