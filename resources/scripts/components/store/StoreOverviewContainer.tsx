import { faMoneyBillWave, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PageContentBlock from '../elements/PageContentBlock';
import { Button } from '@/components/elements/button';
import { Link } from 'react-router-dom';

export default function OverviewContainer() {
    return (
        <PageContentBlock title={'Store Overview'} description={'Deploy your servers!'}>
            <div className={'lg:grid lg:grid-cols-2 gap-8 my-10'}>
                <div className={'bg-gray-800 bg-opacity-75 text-center rounded-lg p-2 m-2 '}>
                    <FontAwesomeIcon className='py-6' size='6x' icon={faPlusCircle} />
                    <p className={'text-3xl text-gray-200'}>Want to create a server?</p>
                    <Link to={`/store/create`}>
                        <Button className={'my-4 w-1/2'}>Create</Button>
                    </Link>
                </div>
                <div className={'bg-gray-800 bg-opacity-75 text-center rounded-lg p-2 m-2 '}>
                    <FontAwesomeIcon className='py-6' size='6x' icon={faMoneyBillWave} />
                    <p className={'text-3xl text-gray-200'}>Ran out of funds?</p>
                    <Link to={`/store/funds`}>
                        <Button className={'my-4 w-1/2'}>Deposit</Button>
                    </Link>
                </div>
            </div>
        </PageContentBlock>
    );
}
