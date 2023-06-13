import React, { lazy } from 'react';
import ServerConsole from '@/components/server/console/ServerConsoleContainer';
import DatabasesContainer from '@/components/server/databases/DatabasesContainer';
import ScheduleContainer from '@/components/server/schedules/ScheduleContainer';
import UsersContainer from '@/components/server/users/UsersContainer';
import BackupContainer from '@/components/server/backups/BackupContainer';
import NetworkContainer from '@/components/server/network/NetworkContainer';
import StartupContainer from '@/components/server/startup/StartupContainer';
import FileManagerContainer from '@/components/server/files/FileManagerContainer';
import SettingsContainer from '@/components/server/settings/SettingsContainer';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import ActivityLogContainer from '@/components/dashboard/activity/ActivityLogContainer';
import ServerActivityLogContainer from '@/components/server/ServerActivityLogContainer';
import StoreOverviewContainer from '@/components/store/StoreOverviewContainer';
import StoreFundsContainer from '@/components/store/StoreCreditsContainer';
import StoreDeployContainer from '@/components/store/StoreDeployContainer';
import {
    faTerminal,
    faFolderOpen,
    faDatabase,
    faCalendarWeek,
    faUsers,
    faUpload,
    faEthernet,
    faPlayCircle,
    faCogs,
    faUser,
    faBook,
    faKey,
    faCode,
    faPlus,
    faDollarSign,
    faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import ServerGraphsContainer from '@/components/server/console/ServerGraphsContainer';

// Each of the router files is already code split out appropriately — so
// all of the items above will only be loaded in when that router is loaded.
//
// These specific lazy loaded routes are to avoid loading in heavy screens
// for the server dashboard when they're only needed for specific instances.
const FileEditContainer = lazy(() => import('@/components/server/files/FileEditContainer'));
const ScheduleEditContainer = lazy(() => import('@/components/server/schedules/ScheduleEditContainer'));

interface RouteDefinition {
    path: string;
    // If undefined is passed this route is still rendered into the router itself
    // but no navigation link is displayed in the sub-navigation menu.
    name: string | undefined;
    component: React.ComponentType;
    exact?: boolean;
    icon?: any;
}

interface ServerRouteDefinition extends RouteDefinition {
    permission: string | string[] | null;
    icon: any;
}

interface Routes {
    // All of the routes available under "/store"
    store: RouteDefinition[];
    // All of the routes available under "/account"
    account: RouteDefinition[];
    // All of the routes available under "/server/:id"
    server: ServerRouteDefinition[];
}

export default {
    account: [
        {
            path: '/',
            name: 'Account',
            component: AccountOverviewContainer,
            icon: faUser,
            exact: true,
        },
        {
            path: '/activity',
            name: 'Activity',
            icon: faBook,
            component: ActivityLogContainer,
        },
        {
            path: '/api',
            name: 'API',
            icon: faCode,
            component: AccountApiContainer,
        },
        {
            path: '/ssh',
            name: 'SSH Keys',
            icon: faKey,
            component: AccountSSHContainer,
        },
    ],
    store: [
        {
            path: '/',
            name: 'Overview',
            component: StoreOverviewContainer,
            icon: faBook,
            exact: true,
        },
        {
            path: '/funds',
            name: 'Credits',
            icon: faDollarSign,
            component: StoreFundsContainer,
        },
        {
            path: '/create',
            name: 'Deploy',
            icon: faPlus,
            component: StoreDeployContainer,
        },
    ],
    server: [
        {
            path: '/',
            permission: null,
            name: 'Console',
            icon: faTerminal,
            component: ServerConsole,
            exact: true,
        },
        {
            path: '/graphs',
            permission: null,
            name: 'Graphs',
            icon: faChartBar,
            component: ServerGraphsContainer,
        },
        {
            path: '/activity',
            permission: 'activity.*',
            name: 'Activity',
            icon: faBook,
            component: ServerActivityLogContainer,
        },
        {
            path: '/files',
            permission: 'file.*',
            name: 'Files',
            icon: faFolderOpen,
            component: FileManagerContainer,
        },
        {
            path: '/files/:action(edit|new)',
            permission: 'file.*',
            name: undefined,
            component: FileEditContainer,
        },
        {
            path: '/databases',
            permission: 'database.*',
            name: 'Databases',
            icon: faDatabase,
            component: DatabasesContainer,
        },
        {
            path: '/schedules',
            permission: 'schedule.*',
            name: 'Schedules',
            icon: faCalendarWeek,
            component: ScheduleContainer,
        },
        {
            path: '/schedules/:id',
            permission: 'schedule.*',
            name: undefined,
            component: ScheduleEditContainer,
        },
        {
            path: '/users',
            permission: 'user.*',
            name: 'Users',
            icon: faUsers,
            component: UsersContainer,
        },
        {
            path: '/backups',
            permission: 'backup.*',
            name: 'Backups',
            icon: faUpload,
            component: BackupContainer,
        },
        {
            path: '/network',
            permission: 'allocation.*',
            name: 'Network',
            icon: faEthernet,
            component: NetworkContainer,
        },
        {
            path: '/startup',
            permission: 'startup.*',
            name: 'Startup',
            icon: faPlayCircle,
            component: StartupContainer,
        },
        {
            path: '/settings',
            permission: ['settings.*', 'file.sftp'],
            name: 'Settings',
            icon: faCogs,
            component: SettingsContainer,
        },
    ],
} as Routes;
