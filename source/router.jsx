import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Core } from 'screens/core/component';
import { ErrorView } from 'screens/error/component/view';

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/:transaction" exact component={ Core } />
            <Route component={ () => (<ErrorView headline="404" description="Strona której szukasz nie istnieje." isVisible={ false } />) } />
        </Switch>
    </BrowserRouter>
);