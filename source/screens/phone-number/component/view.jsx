import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { ScreenView } from 'utilities/components/screen/component/view';
import { HeadlineView } from 'utilities/components/headline/component/view';
import { Field } from 'utilities/components/field/component';
import { SubmitView } from 'utilities/components/submit/component/view';

import { setPhoneNumberRequest } from '../requests/set-phone-number';

import './view.scss';

export const PhoneNumberView = ({
    data,
    isVisible,
    toggleVisibility,
    setPhoneNumber,
    setError
}) => (
    <ScreenView title="phone-number" data={ data }>
        <h1 className="main__headline">Uzupełnij dane, aby dostać kredyt.</h1>
        <p className="main__description">Następnie sprawdzimy, czy spełniasz wszystkie kryteria aby dostąpić tego zaszczytu.</p>
        <HeadlineView text="Podaj numer, na który dostaniesz kod weryfikacyjny." />
        <Formik
            initialValues={{
                phoneNumber: data.customer.phoneNumber,
                agreementsAcceptance: false,
                requiredAcceptance: false,
                optionalAcceptance: false
            }}
            initialTouched={{
                phoneNumber: data.customer.phoneNumber
            }}
            validationSchema={ Yup.object({
                phoneNumber: Yup
                    .string()
                    .matches(/^\d{9}$/, 'Numer telefonu jest niepoprawny (XXXXXXXXX)')
                    .required('Numer telefonu jest wymagany'),
                agreementsAcceptance: Yup
                    .boolean(),
                requiredAcceptance: Yup
                    .boolean()
                    .oneOf([true], 'Akceptacja oświadczenia jest wymagana')
                    .required('Akceptacja oświadczenia jest wymagana'),
                optionalAcceptance: Yup
                    .boolean()
            }) }
            onSubmit={ (values) => {
                const confirmedAgreements = [];

                if (values.requiredAcceptance) {
                    confirmedAgreements.push('required');
                }

                if (values.optionalAcceptance) {
                    confirmedAgreements.push('optional');
                }

                setPhoneNumberRequest(values.phoneNumber, confirmedAgreements)
                    .then(() => {
                        setPhoneNumber(values.phoneNumber);
                    })
                    .catch(() => {
                        setError('Coś się staneło!');
                    });
            } }
        >
            {
                ({
                    dirty,
                    values,
                    touched,
                    isValid,
                    isSubmitting,
                    setValues,
                    setTouched
                }) => (
                    <Form>
                        <Field
                            label="Numer telefonu"
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            minLength="9"
                            maxLength="9"
                        />
                        <Field
                            label="Akceptuję wszystkie oświadczenia"
                            id="agreementsAcceptance"
                            name="agreementsAcceptance"
                            type="checkbox"
                            required={ false }
                            handleClick={ () => {
                                setTouched({
                                    phoneNumber: touched.phoneNumber,
                                    agreementsAcceptance: true,
                                    requiredAcceptance: true,
                                    optionalAcceptance: true
                                });
                                setValues({
                                    phoneNumber: values.phoneNumber,
                                    agreementsAcceptance: values.agreementsAcceptance,
                                    requiredAcceptance: values.agreementsAcceptance,
                                    optionalAcceptance: values.agreementsAcceptance
                                });
                            } }
                        >
                            <button className="main__toggle" type="button" onClick={ toggleVisibility }>{ (isVisible) ? (<>Zwiń &#9652;</>) : (<>Rozwiń &#9662;</>) }</button>
                        </Field>
                        {
                            (isVisible)
                                && (
                                    <div className="main__explanation">
                                        <Field
                                            label="* Wymagana zgoda."
                                            explanation="Super fajny opis zgody."
                                            id="requiredAcceptance"
                                            name="requiredAcceptance"
                                            type="checkbox"
                                        />
                                        <Field
                                            label="Opcjonalna zgoda."
                                            explanation="Super fajny opis zgody."
                                            id="optionalAcceptance"
                                            name="optionalAcceptance"
                                            type="checkbox"
                                            required={ false }
                                        />
                                    </div>
                                )
                        }
                        <SubmitView dirty={ dirty } isValid={ isValid } isSubmitting={ isSubmitting } />
                    </Form>
                )
            }
        </Formik>
    </ScreenView>
);

PhoneNumberView.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    isVisible: PropTypes.bool.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
    setPhoneNumber: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};