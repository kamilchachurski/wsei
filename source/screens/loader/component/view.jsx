import React from 'react';

import spinner from 'assets/images/spinner--riptide.svg';

import './view.scss';

export const LoaderView = () => (
    <main className="loader">
        <img className="loader__spinner" src={ spinner } alt="spinner" />
    </main>
);