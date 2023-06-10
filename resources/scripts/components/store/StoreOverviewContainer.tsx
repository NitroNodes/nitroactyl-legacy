import { faMoneyBillWave, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import PageContentBlock from '../elements/PageContentBlock';
import { Link, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import { PaginatedResult } from '@/api/http';
import getServers from '@/api/getServers';
import Pagination from '../elements/Pagination';
import Spinner from '../elements/Spinner';
import Button from '@/components/elements/Button';
import tw from 'twin.macro';
import { Server } from '@/api/server/getServer';
import useFlash from '@/plugins/useFlash';
import deleteServer from '@/api/server/deleteServer';
import Code from '../elements/Code';
import { Dialog } from '@/components/elements/dialog';
import Input from '../elements/Input';

export default function OverviewContainer() {
    const { search } = useLocation();
    const defaultPage = Number(new URLSearchParams(search).get('page') || '1');
    const [page, setPage] = useState(!isNaN(defaultPage) && defaultPage > 0 ? defaultPage : 1);

    const [name, setName] = useState('');
    const [serverName, setServerName] = useState('');
    const [uuid, setUuid] = useState('');

    const [warn, setWarn] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const { addFlash, clearFlashes } = useFlash();

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        clearFlashes('store-overview');

        deleteServer(uuid, name)
            .then(() => {
                setConfirm(false);
                addFlash({
                    key: 'store-overview',
                    type: 'success',
                    title: 'success',
                    message: 'Your server has been successfully deleted.',
                });
                // @ts-expect-error this is valid
                window.location = '/';
            })
            .catch(() => {
                setConfirm(false);
                addFlash({
                    key: 'store-overview',
                    type: 'danger',
                    title: 'error',
                    message: 'An error occured while deleting your server!',
                });
            });
    };

    const { data: servers } = useSWR<PaginatedResult<Server>>(['/api/client/servers', false, page], () =>
        getServers({ page, type: undefined })
    );

    useEffect(() => {
        if (!servers) return;
        if (servers.pagination.currentPage > 1 && !servers.items.length) {
            setPage(1);
        }
    }, [servers?.pagination.currentPage]);

    useEffect(() => {
        window.history.replaceState(null, document.title, `/${page <= 1 ? '' : `?page=${page}`}`);
    }, [page]);

    return (
        <PageContentBlock showFlashKey={'store-overview'} title={'Store Overview'} description={'Deploy your servers!'}>
            <Dialog.Confirm
                open={warn}
                title={'Do you want to continue'}
                confirm={'Yes, continue'}
                onClose={() => setWarn(false)}
                onConfirmed={() => {
                    setConfirm(true);
                    setWarn(false);
                }}
            >
                Your server will be deleted, with all files being purged. You wont get refunded.
            </Dialog.Confirm>
            <form id={'delete-server-form'} onSubmit={submit}>
                <Dialog
                    open={confirm}
                    title={'Confirm server deletion'}
                    onClose={() => {
                        setConfirm(false);
                        setName('');
                    }}
                >
                    <p className={'my-2 text-gray-400'}>
                        Type <Code>{serverName}</Code> below.
                    </p>
                    <Input type={'text'} value={name} onChange={(n) => setName(n.target.value)} />
                    <Button
                        disabled={name !== serverName}
                        type={'submit'}
                        className={'mt-4'}
                        form={'delete-server-form'}
                    >
                        Delete server
                    </Button>
                </Dialog>
            </form>
            <div className={'text-center w-full h-46'}>
                <p className={'text-3xl mt-4 text-gray-200 text-left px-4'}>Your servers</p>
                {!servers ? (
                    <Spinner centered size={'large'} />
                ) : (
                    <Pagination data={servers} onPageSelect={setPage}>
                        {({ items }) =>
                            items.length > 0 ? (
                                <div className={'lg:grid lg:grid-cols-2 gap-4 mb-10 mt-4'}>
                                    {items.map((server: Server) => (
                                        <div
                                            key={server.uuid}
                                            className='bg-neutral-800 h-44 py-4 mt-2 rounded shadow-lg mb-2 w-full mx-auto'
                                        >
                                            <p className='text-xl font-bold break-words mt-2'>{server.name}</p>
                                            <p>
                                                Renew cost: <b>renew cost</b>
                                            </p>
                                            <p>
                                                Renew before: <b>renew date</b>
                                            </p>
                                            <div css={tw`flex-1 text-center`}>
                                                <Button
                                                    onClick={() => {
                                                        setUuid(server.uuid);
                                                        setServerName(server.name);
                                                        setWarn(true);
                                                    }}
                                                    color={'red'}
                                                    className={'mt-2 w-1/2'}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className={'text-center text-sm text-neutral-400'}>
                                    There are no servers associated with your account. Maybe you should create one?
                                </p>
                            )
                        }
                    </Pagination>
                )}
            </div>
            <p className={'text-3xl  text-gray-200 text-left mt-4 px-4'}>Quick Actions</p>
            <div className={'lg:grid lg:grid-cols-2 gap-4 my-4'}>
                <div className={'bg-gray-800 text-center rounded shadow-lg p-2 px-4 m-2 '}>
                    <FontAwesomeIcon className='py-6' size='6x' icon={faPlusCircle} />
                    <p className={'text-3xl text-gray-200'}>Want to create a server?</p>
                    <Link to={`/store/create`}>
                        <Button className={'my-4 w-1/2'} color='grey'>
                            <FontAwesomeIcon icon={faPlusCircle} className={'mx-auto'} />
                            &nbsp;Create
                        </Button>
                    </Link>
                </div>
                <div className={'bg-gray-800 text-center rounded shadow-lg p-2 px-4 m-2 '}>
                    <FontAwesomeIcon className='py-6' size='6x' icon={faMoneyBillWave} />
                    <p className={'text-3xl text-gray-200'}>Run out of credits?</p>
                    <Link to={`/store/funds`}>
                        <Button className={'my-4 w-1/2'} color='grey'>
                            Add Balance
                        </Button>
                    </Link>
                </div>
            </div>
        </PageContentBlock>
    );
}
