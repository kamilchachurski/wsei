import { confirmPaymentRequest } from 'utilities/requests/confirm-payment';

export const confirmPayment = (incrementCurrentStep, setError) => {
    confirmPaymentRequest()
        .then(() => {
            incrementCurrentStep();
        })
        .catch(() => {
            setError('Coś się stanęło!');
        });
};