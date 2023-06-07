import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import TransitionRouter from '@/TransitionRouter';
import SubNavigation from '@/components/elements/SubNavigation';
import { useLocation, useRouteMatch } from 'react-router';
import Spinner from '@/components/elements/Spinner';
import routes from '@/routers/routes';
import SidePanel from '@/components/SideBar';
import MobileNavigation from '@/components/MobileNavigation';
import useWindowDimensions from '@/plugins/useWindowDimensions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default () => {
    const location = useLocation();
    const { width } = useWindowDimensions();

    return (
        <>
            {width >= 1800 ? <SidePanel /> : <MobileNavigation />}
            {location.pathname.startsWith('/account') && (
                <SubNavigation>
                    <div>
                        {routes.account
                            .filter((route) => !!route.name)
                            .map((route) => (
                                <NavLink
                                    key={route.path}
                                    to={`/account/${route.path}`.replace('//', '/')}
                                    exact={route.exact}
                                >
                                    {route.icon && <FontAwesomeIcon icon={route.icon} className={'mr-1'} />}{' '}
                                    {route.name}
                                </NavLink>
                            ))}
                    </div>
                </SubNavigation>
            )}

            {location.pathname.startsWith('/store') && (
                <SubNavigation>
                    <div>
                        {routes.store
                            .filter((route) => !!route.name)
                            .map((route) => (
                                <NavLink
                                    key={route.path}
                                    to={`/store/${route.path}`.replace('//', '/')}
                                    exact={route.exact}
                                >
                                    {route.icon && <FontAwesomeIcon icon={route.icon} className={'mr-1'} />}{' '}
                                    {route.name}
                                </NavLink>
                            ))}
                    </div>
                </SubNavigation>
            )}
            <TransitionRouter>
                <React.Suspense fallback={<Spinner centered />}>
                    <Switch location={location}>
                        <Route path={'/'} exact>
                            <DashboardContainer />
                        </Route>
                        {routes.account.map(({ path, component: Component }) => (
                            <Route key={path} path={`/account/${path}`.replace('//', '/')} exact>
                                <Component />
                            </Route>
                        ))}
                        {routes.store.map(({ path, component: Component }) => (
                            <Route key={path} path={`/store/${path}`.replace('//', '/')} exact>
                                <Component />
                            </Route>
                        ))}
                        <Route path={'*'}>
                            <NotFound />
                        </Route>
                    </Switch>
                </React.Suspense>
            </TransitionRouter>
        </>
    );
};
