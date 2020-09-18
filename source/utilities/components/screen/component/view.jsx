import React from 'react';
import PropTypes from 'prop-types';

import { HeaderView } from 'utilities/components/header/component/view';
import { FooterView } from 'utilities/components/footer/component/view';

import './view.scss';

export const ScreenView = ({
    title,
    data,
    children
}) => (
    <main className={ `main ${ title }` }>
        <section className="main__container">
            { children }
            <FooterView />
        </section>
        <HeaderView data={ data } />
    </main>
);

ScreenView.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Object).isRequired,
    children: PropTypes.node.isRequired
};