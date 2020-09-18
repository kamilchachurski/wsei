import Axios from 'axios';

export const confirmPaymentRequest = () => (Axios.post('/confirm-payment.php'));