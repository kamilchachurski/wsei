import React from 'react';
import PropTypes from 'prop-types';

import { HeadlineView } from 'utilities/components/headline/component/view';
import { FooterView } from 'utilities/components/footer/component/view';

import './view.scss';

export const ErrorView = ({ headline, description, isVisible }) => (
    <main className="error">
        <div className="main__container">
            <HeadlineView text={ headline } />
            <p className="main__description">{ description }</p>
            {
                (isVisible)
                    && (<FooterView />)
            }
        </div>
    </main>
);

ErrorView.defaultProps = {
    description: 'Skontaktuj sie z nami jeśli coś się nie podoba.',
    isVisible: true
};

ErrorView.propTypes = {
    headline: PropTypes.string.isRequired,
    description: PropTypes.string,
    isVisible: PropTypes.bool
};