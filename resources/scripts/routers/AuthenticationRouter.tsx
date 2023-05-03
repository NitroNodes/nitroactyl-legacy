import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginContainer from '@/components/auth/LoginContainer';
import RegisterContainer from '@/components/auth/RegisterContainer';
import ForgotPasswordContainer from '@/components/auth/ForgotPasswordContainer';
import ResetPasswordContainer from '@/components/auth/ResetPasswordContainer';
import LoginCheckpointContainer from '@/components/auth/LoginCheckpointContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import { useHistory, useLocation } from 'react-router';

export default () => {
    const history = useHistory();
    const location = useLocation();

    return (
        <div className={'pt-8 xl:pt-32'}>
            <Switch location={location}>
                <Route path={`/auth/login`} component={LoginContainer} exact />
                <Route path={`/auth/register`} component={RegisterContainer} exact />
                <Route path={`/auth/login/checkpoint`} component={LoginCheckpointContainer} />
                <Route path={`/auth/password`} component={ForgotPasswordContainer} exact />
                <Route path={`/auth/password/reset/:token`} component={ResetPasswordContainer} />
                <Route path={`/auth/checkpoint`} />
                <Route path='*' element={<NotFound onBack={() => history.push('/')} />} />
            </Switch>
        </div>
    );
};
