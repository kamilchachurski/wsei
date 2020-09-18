import Axios from 'axios';

export const setPhoneNumberRequest = (phoneNumber, confirmedAgreements) => (Axios.post('/set-phone-number.php', { phoneNumber, confirmedAgreements }));