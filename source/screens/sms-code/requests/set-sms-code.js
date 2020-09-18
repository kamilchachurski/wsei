import Axios from 'axios';

export const setSmsCodeRequest = (code, deviceFingerPrint, rememberingDevice) => (Axios.post('/set-sms-code.php', { code, deviceFingerPrint, rememberingDevice }));