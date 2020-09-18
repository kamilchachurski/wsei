export const steps = [
    {
        name: 'phoneNumber',
        type: 'NEW'
    }, {
        name: 'personalData',
        type: 'NEW'
    }, {
        name: 'smsCode',
        skipPhoneNumberVerification: false
    }, {
        name: 'address',
        type: 'NEW',
        skipAddressVerification: false
    }, {
        name: 'confirmation',
        type: 'RETURNING',
        skipAddressVerification: true,
        skipPhoneNumberVerification: true
    }, {
        name: 'complete'
    }
];