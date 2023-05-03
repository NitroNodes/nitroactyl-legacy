import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useStoreState } from '@/state/hooks';

export default ({ children, ...props }: Omit<RouteProps, 'render'>) => {
    const isAuthenticated = useStoreState((state) => !!state.user.data?.uuid);

    return <Route {...props} render={() => (isAuthenticated ? <Redirect to={{ pathname: '/' }} /> : { children })} />;
};
