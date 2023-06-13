import PageContentBlock, { PageContentBlockProps } from '@/components/elements/PageContentBlock';
import React from 'react';
import { ServerContext } from '@/state/server';

interface Props extends PageContentBlockProps {
    title: string;
    description?: string;
}

const ServerContentBlock: React.FC<Props> = ({ title, description, children, ...props }) => {
    const name = ServerContext.useStoreState((state) => state.server.data!.name);

    return (
        <PageContentBlock title={`${name} | ${title}`} {...props}>
            {description && (
                <div className={'my-[1rem]'}>
                    <h1 className={'text-5xl text-neutral-100'}>{title}</h1>
                    <h3 className={'text-2xl text-neutral-300'}>{description}</h3>
                </div>
            )}
            {children}
        </PageContentBlock>
    );
};

export default ServerContentBlock;
