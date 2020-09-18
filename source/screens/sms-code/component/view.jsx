import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { ScreenView } from 'utilities/components/screen/component/view';
import { HeadlineView } from 'utilities/components/headline/component/view';
import { Field } from 'utilities/components/field/component';
import { SubmitView } from 'utilities/components/submit/component/view';

import { setSmsCodeRequest } from '../requests/set-sms-code';
import { confirmPayment } from 'utilities/confirm-payment';

import './view.scss';

export const SmsCodeView = ({
    isConfirmation,
    data,
    incrementCurrentStep,
    setError
}) => (
    <ScreenView title="sms-code" data={ data }>
        {
            (data.customer.type === 'RETURNING')
                && (
                    <p className="main__subheadline">
                        Witaj,
                        { ' ' }
                        { data.customer.firstName }
                        !
                        <br />
                        Wysłaliśmy Ci SMS na numer
                        { ' ' }
                        { data.customer.phoneNumber.replace(/(\d)(\d{5})/, '$1*****') }
                    </p>
                )
        }
        <HeadlineView text="Wpisz kod sms." />
        <Formik
            initialValues={{
                smsCode: '',
                rememberingDevice: false
            }}
            validationSchema={ Yup.object({
                smsCode: Yup
                    .string()
                    .matches(/^\d{6}$/, 'Kod sms jest niepoprawny')
                    .required('Kod sms jest wymagany'),
                rememberingDevice: Yup
                    .boolean()
            }) }
            onSubmit={ (values, { setSubmitting, setFieldError }) => {
                setSmsCodeRequest(parseInt(values.smsCode, 10), data.settings.deviceFingerPrint, values.rememberingDevice)
                    .then(() => {
                        if (isConfirmation) {
                            confirmPayment(incrementCurrentStep, setError);
                        } else {
                            incrementCurrentStep();
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 403) {
                            setFieldError('smsCode', 'Kod sms jest niepoprawny');
                            setSubmitting(false);
                        } else {
                            setError('Coś się stanęło!');
                        }
                    });
            } }
        >
            {
                ({ dirty, isValid, isSubmitting }) => (
                    <Form>
                        <Field
                            label="Kod sms"
                            id="smsCode"
                            name="smsCode"
                            type="text"
                            minLength="6"
                            maxLength="6"
                        />
                        <Field
                            label="Nie pytaj ponownie o kod na tym urządzeniu"
                            id="rememberingDevice"
                            name="rememberingDevice"
                            type="checkbox"
                            required={ false }
                        />
                        <SubmitView
                            text={ (isConfirmation) ? ('Zadłuż się') : ('Dalej') }
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

SmsCodeView.propTypes = {
    isConfirmation: PropTypes.bool.isRequired,
    data: PropTypes.instanceOf(Object).isRequired,
    incrementCurrentStep: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};