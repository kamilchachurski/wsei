import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'router';

import 'assets/styles/fonts.scss';
import 'assets/styles/normalize.scss';

const Application = () => (<Router />);

ReactDOM.render(<Application />, document.getElementById('application'));

if (process.env.NODE_ENV === 'development') {
    module.hot.accept();
}