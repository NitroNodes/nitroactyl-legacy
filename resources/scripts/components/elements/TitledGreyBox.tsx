import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import isEqual from 'react-fast-compare';
import classNames from 'classnames';

interface Props {
    icon?: IconProp;
    title: string | React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const TitledGreyBox = ({ icon, title, children, className }: Props) => (
    <div className={classNames('shadow-2xl bg-neutral-800', className)}>
        <div className={'bg-neutral-800 border-gray-800'}>
            <p className={'text-neutral-100 p-4 pb-1 ml-1 text-2xl font-semibold'}>
                {icon && <FontAwesomeIcon icon={icon} className={'w-4 h-4 mr-2 mb-1'} />}
                {title}
            </p>
        </div>
        <div className={'p-6 pt-3'}>{children}</div>
    </div>
);

export default memo(TitledGreyBox, isEqual);
