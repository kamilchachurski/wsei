import Axios from 'axios';

export const getDataRequest = () => (Axios.get('/get-data.php'));