import SecureLocalStorage from 'secure-ls';

export const secureLocalStorage = new SecureLocalStorage({
    encodingType: 'aes',
    encryptionSecret: process.env.ENCRYPTION_SECRET
});