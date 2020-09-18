import React from 'react';
import PropTypes from 'prop-types';

import './view.scss';

export const HeaderView = ({ data }) => (
    <header className="header">
        <div className="header__container">
            <div>
                <p className="header__name">{ `Sklep: ${ data.transaction.shopName }` }</p>
                <p className="header__transaction">{ `Transakcja: ${ data.transaction.id }` }</p>
            </div>
        </div>
        <div className="header__details">
            <div className="header__container">
                Wartość zamówienia:
                <p className="header__price">
                    { parseInt(data.transaction.amount, 10).toFixed(2) }
                    { ' ' }
                    zł
                </p>
                <p className="header__principles">A tutaj super opis o najważniejszych cechach kredytu.</p>
            </div>
        </div>
    </header>
);

HeaderView.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired
};