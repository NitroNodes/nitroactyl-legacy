import React from 'react';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import Spinner from '@/components/elements/Spinner';
import StatGraphs from '@/components/server/console/StatGraphs';

export default function ServerGraphsContainer() {
    return (
        <ServerContentBlock title={'Graphs'} description={'View your server statistics'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4'}>
                <Spinner.Suspense>
                    <StatGraphs />
                </Spinner.Suspense>
            </div>
        </ServerContentBlock>
    );
}
