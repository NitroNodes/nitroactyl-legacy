import React, { useState } from 'react';
import http from '@/api/http';

import { useStoreState } from 'easy-peasy';
import { Link, NavLink } from 'react-router-dom';
import {
    faCogs,
    faLayerGroup,
    faPlus,
    faSearch,
    faSignOutAlt,
    faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchModal from '@/components/dashboard/search/SearchModal';
import defaultLogo from '@/assets/images/logo.png';
import { ApplicationStore } from '@/state';
import Avatar from './Avatar';

export default () => {
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const [visible, setVisible] = useState(false);

    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
    const username = useStoreState((state: ApplicationStore) => state.user.data!.username);
    const logo = useStoreState((state: ApplicationStore) => state.settings.data!.logo);

    const onTriggerLogout = () => {
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };

    return (
        <>
            {visible && <SearchModal appear visible={visible} onDismissed={() => setVisible(false)} />}
            <div className='fixed top-0 left-0 z-[100] w-60 h-screen bg-neutral-800 shadow-md overflow-x-hidden'>
                <div className='flex flex-grow flex-col overflow-y-auto h-screen  pb-4 pt-5 overflow-x-hidden'>
                    <Link to='/' className='inline-flex space-y-5 px-4 transition duration-150'>
                        <img className='h-8 w-auto' src={logo || defaultLogo} alt={name + ' Logo'} />
                        <p className='absolute left-[60px] text-xl top-0.5 px-2 font-semibold text-white'>{name}</p>
                    </Link>
                    <div className='mt-5 flex flex-grow flex-col overflow-x-hidden'>
                        <nav className='flex-1 space-y-1 bg-neutral-800' aria-label='Sidebar'>
                            <button
                                onClick={() => {
                                    setVisible(true);
                                }}
                                className='group flex items-center px-3 py-2 text-md font-medium transition border-l-4 border-transparent duration-150 hover:text-primary-400'
                            >
                                <FontAwesomeIcon
                                    fixedWidth={true}
                                    className='mr-3 h-6 w-6 flex-shrink-0'
                                    icon={faSearch}
                                />
                                <span className='ml-3'>Search</span>
                            </button>
                            <NavLink
                                to='/'
                                exact
                                activeClassName='bg-primary-500 border-l-4 bg-opacity-20 border-primary-400 text-primary-400'
                                className='group flex items-center px-3 py-2 text-md font-medium transition border-l-4 border-transparent duration-150 hover:text-primary-400'
                            >
                                <FontAwesomeIcon
                                    fixedWidth={true}
                                    className='mr-3 h-6 w-6 flex-shrink-0'
                                    icon={faLayerGroup}
                                />
                                <span className='ml-3'>Servers</span>
                            </NavLink>
                            <NavLink
                                to='/store/funds'
                                activeClassName='bg-primary-500 border-l-4 bg-opacity-20 border-primary-400 text-primary-400'
                                className='group flex items-center px-3 py-2 text-md font-medium transition border-l-4 border-transparent duration-150 hover:text-primary-400'
                            >
                                <FontAwesomeIcon
                                    fixedWidth={true}
                                    className='mr-3 h-6 w-6 flex-shrink-0'
                                    icon={faMoneyBillWave}
                                />
                                <span className='ml-3'>Balance</span>
                            </NavLink>
                            <NavLink
                                to='/store/create'
                                activeClassName='bg-primary-500 border-l-4 bg-opacity-20 border-primary-400 text-primary-400'
                                className='group flex items-center px-3 py-2 text-md font-medium transition border-l-4 border-transparent duration-150 hover:text-primary-400'
                            >
                                <FontAwesomeIcon
                                    fixedWidth={true}
                                    className='mr-3 h-6 w-6 flex-shrink-0'
                                    icon={faPlus}
                                />
                                <span className='ml-3'>Deploy</span>
                            </NavLink>
                            {rootAdmin && (
                                <a
                                    href='/admin'
                                    className='group flex items-center px-3 py-2 text-md font-medium transition border-l-4 border-transparent duration-150 hover:text-primary-400'
                                >
                                    <FontAwesomeIcon
                                        fixedWidth={true}
                                        className='mr-3 h-6 w-6 flex-shrink-0'
                                        icon={faCogs}
                                    />
                                    <span className='ml-3'>Admin</span>
                                </a>
                            )}
                        </nav>
                    </div>
                    <div className='flex flex-shrink-0'>
                        <div className='group block w-full flex-shrink-0 ml-2'>
                            <div className='flex items-center ml-2'>
                                <div>
                                    <Avatar />
                                </div>
                                <Link to='/account' className='ml-3'>
                                    <p className='text-sm font-medium text-neutral-200 group-hover:text-neutral-100'>
                                        {username}
                                    </p>
                                    <p className='text-xs font-medium text-neutral-300 group-hover:text-neutral-200'>
                                        View profile
                                    </p>
                                </Link>
                                <div className='ml-3 overflow-x-hidden'>
                                    <button
                                        onClick={onTriggerLogout}
                                        className={
                                            'p-2 text-neutral-200 hover:text-primary-400 duration-75 overflow-x-hidden'
                                        }
                                    >
                                        <FontAwesomeIcon fixedWidth={true} icon={faSignOutAlt} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
