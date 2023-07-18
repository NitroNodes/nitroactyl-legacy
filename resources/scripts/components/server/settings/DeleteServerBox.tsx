import React, { useState } from 'react';
import useFlash from '@/plugins/useFlash';
import Code from '@/components/elements/Code';
import { ServerContext } from '@/state/server';
import Input from '@/components/elements/Input';
import deleteServer from '@/api/server/deleteServer';
import { Dialog } from '@/components/elements/dialog';
import { Button } from '@/components/elements/button/index';
import TitledGreyBox from '@/components/elements/TitledGreyBox';

export default () => {
    const [name, setName] = useState('');
    const [warn, setWarn] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const { addFlash, clearFlashes, clearAndAddHttpError } = useFlash();

    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const serverName = ServerContext.useStoreState((state) => state.server.data!.name);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        clearFlashes('settings');

        deleteServer(uuid, name)
            .then(() => {
                setConfirm(false);
                addFlash({
                    key: 'settings',
                    type: 'success',
                    message: 'Your server has been deleted.',
                });
                // @ts-expect-error this is valid
                window.location = '/';
            })
            .catch((error) => clearAndAddHttpError({ key: 'settings', error }));
    };

    return (
        <TitledGreyBox title={'Delete Server'} className={'relative mb-12'}>
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
                    <>
                        <p className={'my-2 text-gray-400'}>
                            Type <Code>{serverName}</Code> below.
                        </p>
                        <Input type={'text'} value={name} onChange={(n) => setName(n.target.value)} />
                    </>
                    <Button
                        disabled={name !== serverName}
                        type={'submit'}
                        className={'mt-2'}
                        form={'delete-server-form'}
                    >
                        Yes, delete server
                    </Button>
                </Dialog>
            </form>
            <p className={'text-sm'}>
                Deleting your server will shut down any processes, it&apos;ll delete files associated with the instance
                - as well as backups, databases and settings.{' '}
                <strong className={'font-medium'}>
                    All data will be permenantly lost if you continue with this action. You wont get refunded!
                </strong>
            </p>
            <div className={'mt-6 font-medium text-right'}>
                <Button.Danger onClick={() => setWarn(true)}>Delete Server</Button.Danger>
            </div>
        </TitledGreyBox>
    );
};
