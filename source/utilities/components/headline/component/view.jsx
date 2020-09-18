import React from 'react';
import PropTypes from 'prop-types';

import './view.scss';

export const HeadlineView = ({ text, isUnderlined }) => (<h2 className={ `headline${ (isUnderlined) ? ('--underlined') : ('') }` }>{ text }</h2>);

HeadlineView.defaultProps = {
    isUnderlined: true
};

HeadlineView.propTypes = {
    text: PropTypes.string.isRequired,
    isUnderlined: PropTypes.bool
};