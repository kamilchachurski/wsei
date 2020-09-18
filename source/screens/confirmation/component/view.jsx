import React from 'react';
import PropTypes from 'prop-types';

import { ScreenView } from 'utilities/components/screen/component/view';
import { HeadlineView } from 'utilities/components/headline/component/view';
import { SubmitView } from 'utilities/components/submit/component/view';

import './view.scss';

export const ConfirmationView = ({ data, isSubmitting, handleClick }) => (
    <ScreenView title="confirmation" data={ data }>
        <HeadlineView text={ `Witaj ${ data.customer.firstName }!` } />
        <p className="main__subheadline">Za chwilę się zadłużysz!</p>
        <SubmitView
            text="Zadłuż się"
            isInitialDisabled={ false }
            isSubmitting={ isSubmitting }
            handleClick={ handleClick }
        />
    </ScreenView>
);

ConfirmationView.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
};