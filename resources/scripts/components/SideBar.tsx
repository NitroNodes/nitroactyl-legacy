import React, { useEffect, useState } from 'react';
import http from '@/api/http';
import { useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { Link, NavLink } from 'react-router-dom';
import {
    faCogs,
    faLayerGroup,
    faPlus,
    faSearch,
    faSignOutAlt,
    faQuestion,
    faBook,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchModal from '@/components/dashboard/search/SearchModal';
import defaultLogo from '@/assets/images/logo.png';
import { ApplicationStore } from '@/state';
import Avatar from './Avatar';

export default () => {
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                setVisible(true);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const uuid = useStoreState((state) => state.user.data!.uuid);
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
            <div className='fixed top-0 left-0 z-[40] w-56 h-screen bg-neutral-800 shadow-md overflow-x-hidden'>
                <div className='flex flex-grow flex-col overflow-y-auto h-screen pb-4 pt-5 overflow-x-hidden'>
                    <Link to='/' className='flex items-center px-4 transition duration-150'>
                        <img
                            className='h-auto my-auto max-h-[36px] w-auto mr-4'
                            src={logo || defaultLogo}
                            alt={name + ' Logo'}
                        />
                        <p className='text-xl font-semibold text-white'>{name}</p>
                    </Link>
                    <div className='mt-5 flex flex-grow flex-col overflow-x-hidden'>
                        <nav className='flex-1 space-y-2 bg-neutral-800' aria-label='Sidebar'>
                            <button
                                onClick={() => {
                                    setVisible(true);
                                }}
                                className='group flex mb-4 items-center text-sm font-medium w-[90%] ml-[5%] mr-[5%] transition duration-150 bg-neutral-700 shadow-sm text-neutral-200 rounded-md px-4 py-2 outline-none border-0'
                            >
                                <FontAwesomeIcon
                                    fixedWidth={true}
                                    className='mr-3 h-4 w-4 flex-shrink-0'
                                    icon={faSearch}
                                />
                                <span className='ml-3'>Type to search</span>
                            </button>
                            <NavLink
                                to='/'
                                exact
                                activeClassName='bg-primary-500 bg-opacity-20 border-primary-400 text-primary-400'
                                className={
                                    'group flex items-center px-3 py-2 text-md font-medium transition border-l-4 border-transparent duration-150 hover:text-primary-400' +
                                    (location.pathname.startsWith('/server')
                                        ? ' border-l-4 bg-opacity-20 border-primary-400 text-primary-400 bg-primary-500'
                                        : '')
                                }
                            >
                                <FontAwesomeIcon
                                    fixedWidth={true}
                                    className='mr-3 h-6 w-6 flex-shrink-0'
                                    icon={faLayerGroup}
                                />
                                <span className='ml-3'>Servers</span>
                            </NavLink>
                            <NavLink
                                to='/store/'
                                activeClassName='bg-primary-500 bg-opacity-20 border-primary-400 text-primary-400'
                                className='group flex items-center px-3 py-2 text-md font-medium transition border-l-4 border-transparent duration-150 hover:text-primary-400'
                            >
                                <FontAwesomeIcon
                                    fixedWidth={true}
                                    className='mr-3 h-6 w-6 flex-shrink-0'
                                    icon={faPlus}
                                />
                                <span className='ml-3'>Deploy</span>
                            </NavLink>
                            <a
                                rel='noreferrer'
                                href='https://www.nitronodes.xyz/discord'
                                target='_blank'
                                className='group flex items-center px-3 py-2 text-md font-medium transition border-l-4 border-transparent duration-150 hover:text-primary-400'
                            >
                                <FontAwesomeIcon
                                    fixedWidth={true}
                                    className='mr-3 h-6 w-6 flex-shrink-0'
                                    icon={faQuestion}
                                />
                                <span className='ml-3'>Support</span>
                            </a>
                            <a
                                rel='noreferrer'
                                href='https://nitronodes.xyz/docs'
                                target='_blank'
                                className='group flex items-center px-3 py-2 text-md font-medium transition border-l-4 border-transparent duration-150 hover:text-primary-400'
                            >
                                <FontAwesomeIcon
                                    fixedWidth={true}
                                    className='mr-3 h-6 w-6 flex-shrink-0'
                                    icon={faBook}
                                />
                                <span className='ml-3'>Docs</span>
                            </a>
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
                        <div
                            className={
                                'group block w-full py-2 flex-shrink-0  ' +
                                (location.pathname.startsWith('/account')
                                    ? 'bg-opacity-20 text-primary-400 bg-primary-500'
                                    : '')
                            }
                        >
                            <div className='flex items-center ml-4'>
                                <Link to='/account' className='my-auto'>
                                    <Avatar size={'28'} name={uuid || 'system'} />
                                </Link>
                                <Link to='/account' className='ml-3'>
                                    <p className='text-sm font-medium text-neutral-300 group-hover:text-neutral-100'>
                                        {username}
                                    </p>
                                    <p className='text-xs font-medium text-neutral-300 group-hover:text-neutral-200'>
                                        Manage account
                                    </p>
                                </Link>
                                <div className='ml-8 overflow-x-hidden'>
                                    <button
                                        onClick={onTriggerLogout}
                                        className={
                                            ' text-neutral-200 hover:text-primary-400 duration-75 overflow-x-hidden'
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
