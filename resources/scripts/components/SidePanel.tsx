import React, { useState } from 'react';
import http from '@/api/http';

import { useStoreState } from 'easy-peasy';
import { NavLink } from 'react-router-dom';
import { faCogs, faPlus, faSearch, faServer, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchModal from '@/components/dashboard/search/SearchModal';

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
                    <a
                        href={'https://www.nitronodes.xyz'}
                        className='flex items-center pl-2.5 mb-5 hover:opacity-75 duration-75'
                    >
                        <img
                            src='https://www.nitronodes.xyz/assets/img/logo.png'
                            className='h-6 mr-3 sm:h-7'
                            alt='NitroNodes Logo'
                        />
                        <span className='self-center text-xl font-semibold whitespace-nowrap text-white ml-2'>
                            NitroNodes
                        </span>
                    </a>
                    <ul className='space-y-2 font-medium'>
                        <li>
                            <a
                                onClick={() => {
                                    setVisible(true);
                                }}
                                className={
                                    'navigation-link flex items-center p-2 rounded-lg text-white hover:text-primary-400 w-full font-semibold text-lg  cursor-pointer'
                                }
                            >
                                <FontAwesomeIcon icon={faSearch} />
                                <span className='ml-3'>Search</span>
                            </a>
                        </li>
                        <li>
                            <NavLink
                                to={'/'}
                                exact
                                className={
                                    'navigation-link flex items-center p-2 rounded-lg text-white hover:text-primary-400 w-full font-semibold text-lg '
                                }
                                activeClassName='text-primary-400'
                            >
                                <FontAwesomeIcon icon={faServer} />
                                <span className='ml-3'>Servers</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to={'/store'}
                                className={
                                    'navigation-link flex items-center p-2 rounded-lg text-white hover:text-primary-400 w-full font-semibold text-lg '
                                }
                                activeClassName='text-primary-400'
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <span className='ml-3'>Store</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/account'}
                                className={
                                    'navigation-link flex items-center p-2 rounded-lg text-white hover:text-primary-400 w-full font-semibold text-lg '
                                }
                                activeClassName='text-primary-400'
                            >
                                <FontAwesomeIcon icon={faUser} />
                                <span className='ml-3'>Account</span>
                            </NavLink>
                        </li>
                        {rootAdmin && (
                            <li>
                                <a
                                    href={'/admin'}
                                    className={
                                        'navigation-link flex items-center p-2 rounded-lg text-white hover:text-primary-400 w-full font-semibold text-lg '
                                    }
                                >
                                    <FontAwesomeIcon icon={faCogs} />
                                    <span className='ml-3'>Admin</span>
                                </a>
                            </li>
                        )}
                        <li>
                            <a
                                href='#'
                                onClick={onTriggerLogout}
                                className={
                                    'navigation-link absolute w-[60%] bottom-4 p-2 rounded-lg text-white hover:text-primary-400 w-full '
                                }
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span className='ml-3'>Log out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
