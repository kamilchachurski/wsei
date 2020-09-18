import Axios from 'axios';

export const setAddressRequest = (street, postcode, city) => (Axios.post('/set-address.php', { street, postcode, city }));