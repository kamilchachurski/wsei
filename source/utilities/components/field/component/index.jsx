import React, { useState, useRef, useLayoutEffect } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';

import { FieldView } from './view';

export const Field = ({
    label,
    explanation,
    children,
    handleClick,
    ...props
}) => {
    const [isVisible, setVisibility] = useState(false);
    const isFirstRender = useRef(true);
    const [input, meta, helper] = useField(props);

    const toggleVisibility = (event) => {
        event.preventDefault();

        setVisibility((previousVisibility) => (!previousVisibility));
    };

    const handleChange = () => {
        helper.setTouched(true);
        helper.setValue(!meta.value);
    };

    useLayoutEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            handleClick();
        }
    }, [meta.value]);

    return (
        <FieldView
            label={ label }
            explanation={ explanation }
            isVisible={ isVisible }
            props={ props }
            input={ input }
            touched={ meta.touched }
            error={ meta.error }
            toggleVisibility={ toggleVisibility }
            handleChange={ handleChange }
        >
            { children }
        </FieldView>
    );
};

Field.defaultProps = {
    explanation: '',
    children: '',
    handleClick: () => {}
};

Field.propTypes = {
    label: PropTypes.string.isRequired,
    explanation: PropTypes.node,
    children: PropTypes.node,
    handleClick: PropTypes.func
};