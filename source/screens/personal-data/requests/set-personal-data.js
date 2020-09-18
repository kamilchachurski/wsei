import Axios from 'axios';

export const setPersonalDataRequest = (firstName, lastName, pesel) => (Axios.patch('/set-personal-data.php', { firstName, lastName, pesel }));