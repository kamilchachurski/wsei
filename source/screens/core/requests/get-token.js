import Axios from 'axios';

export const getTokenRequest = (transaction) => (Axios.post('/get-token.php', { transaction }));