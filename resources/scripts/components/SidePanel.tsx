import React, { useState } from 'react';
import http from '@/api/http';

import { useStoreState } from 'easy-peasy';
import { Link, NavLink } from 'react-router-dom';
import { faCogs, faPlus, faSearch, faServer, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchModal from '@/components/dashboard/search/SearchModal';
import logo from '@/assets/images/logo.png';

export default () => {
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const [visible, setVisible] = useState(false);

    const onTriggerLogout = () => {
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };

    return (
        <>
            {visible && <SearchModal appear visible={visible} onDismissed={() => setVisible(false)} />}
            <div className='fixed top-0 left-0 z-[100] w-52 h-screen' aria-label='Sidebar'>
                <div className='h-full px-3 py-4 overflow-y-auto bg-neutral-800'>
                    <Link to={'/'} className='flex items-center pl-2.5 mb-5 hover:opacity-75 duration-75'>
                        <img src={logo} className='h-6 mr-3 sm:h-7' alt='NitroNodes Logo' />
                        <span className='self-center text-xl font-semibold whitespace-nowrap text-white ml-2'>
                            NitroNodes
                        </span>
                    </Link>
                    <ul className='space-y-2 font-normal text-lg'>
                        <li>
                            <a
                                onClick={() => {
                                    setVisible(true);
                                }}
                                className={
                                    'flex items-center p-2 text-white hover:text-primary-400 duration-75 w-full cursor-pointer'
                                }
                            >
                                <FontAwesomeIcon fixedWidth={true} icon={faSearch} />
                                <span className='ml-3'>Search</span>
                            </a>
                        </li>
                        <li>
                            <NavLink
                                to={'/'}
                                exact
                                className={'flex items-center p-2 text-white hover:text-primary-400 duration-75 w-full'}
                                activeClassName='text-primary-400'
                            >
                                <FontAwesomeIcon fixedWidth={true} icon={faServer} />
                                <span className='ml-3'>Servers</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to={'/store'}
                                className={'flex items-center p-2 text-white hover:text-primary-400 duration-75 w-full'}
                                activeClassName='text-primary-400'
                            >
                                <FontAwesomeIcon fixedWidth={true} icon={faPlus} />
                                <span className='ml-3'>Store</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/account'}
                                className={'flex items-center p-2 text-white hover:text-primary-400 duration-75 w-full'}
                                activeClassName='text-primary-400'
                            >
                                <FontAwesomeIcon fixedWidth={true} icon={faUser} />
                                <span className='ml-3'>Account</span>
                            </NavLink>
                        </li>
                        {rootAdmin && (
                            <li>
                                <a
                                    href={'/admin'}
                                    className={
                                        'flex items-center p-2 text-white hover:text-primary-400 duration-75 w-full'
                                    }
                                >
                                    <FontAwesomeIcon fixedWidth={true} icon={faCogs} />
                                    <span className='ml-3'>Admin</span>
                                </a>
                            </li>
                        )}
                        <li className={'absolute bottom-4'}>
                            <a
                                href='#'
                                onClick={onTriggerLogout}
                                className={'p-2 text-white hover:text-primary-400 duration-75 w-full'}
                            >
                                <FontAwesomeIcon fixedWidth={true} icon={faSignOutAlt} />
                                <span className='ml-3'>Log out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
