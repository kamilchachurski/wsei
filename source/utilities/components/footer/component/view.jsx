import React from 'react';

import './view.scss';

export const FooterView = () => (
    <footer className="footer">
        <p>
            Jakiś problem?
            <br />
            Napisz na adres
            { ' ' }
            <a className="footer__contact" href="mailto:lorem@ipsum.com">lorem@ipsum.com</a>
            { ' ' }
            lub zadzwoń pod numer
            { ' ' }
            <a className="footer__contact" href="tel:112">112</a>
        </p>
        Super ważna nota o przetwarzaniu danych osobowych, a projekt wykonał Kamil Chachurski.
    </footer>
);