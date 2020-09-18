import React from 'react';

import { HeadlineView } from 'utilities/components/headline/component/view';
import { FooterView } from 'utilities/components/footer/component/view';

import './view.scss';

export const CompleteView = () => (
    <main className="complete">
        <div className="main__container">
            <p className="main__subheadline">Udało się!</p>
            <HeadlineView text="Dostałeś kredyt!" />
            <p className="main__description">Na podany przez Ciebie adres wysłaliśmy potwierdzenie transakcji oraz inne ważne informacje.</p>
            <FooterView />
        </div>
    </main>
);