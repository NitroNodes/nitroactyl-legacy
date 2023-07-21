import React from 'react';
import PageContentBlock from '@/components/elements/PageContentBlock';
import tw from 'twin.macro';
import Button from '@/components/elements/Button';
import NotFoundSvg from '@/assets/images/not_found.svg';
import ServerErrorSvg from '@/assets/images/server_error.svg';

interface BaseProps {
    title: string;
    image: string;
    message: string;
    onRetry?: () => void;
    onBack?: () => void;
}

interface PropsWithRetry extends BaseProps {
    onRetry?: () => void;
    onBack?: never;
}

interface PropsWithBack extends BaseProps {
    onBack?: () => void;
    onRetry?: never;
}

export type ScreenBlockProps = PropsWithBack | PropsWithRetry;

const ScreenBlock = ({ title, image, message, onBack, onRetry }: ScreenBlockProps) => (
    <PageContentBlock>
        <div css={tw`flex justify-center`}>
            <div
                css={tw`w-full sm:w-3/4 md:w-1/2 p-12 md:p-20 bg-neutral-800 rounded-lg shadow-lg text-center relative`}
            >
                <img src={image} css={tw`w-2/3 h-auto select-none mx-auto`} />
                <h2 css={tw`mt-10 text-neutral-100 font-bold text-4xl`}>{title}</h2>
                <p css={tw`text-sm text-neutral-200 mt-2`}>{message}</p>
                {(typeof onBack === 'function' || typeof onRetry === 'function') && (
                    <div css={tw`mx-auto mt-4`}>
                        <Button className='px-10' onClick={() => (onRetry ? onRetry() : null)}>
                            Retry
                        </Button>
                    </div>
                )}
                {typeof onBack === 'function' && (
                    <div css={tw`mx-auto mt-4`}>
                        <Button className='px-10' onClick={() => (onBack ? onBack() : null)}>
                            Go back
                        </Button>
                    </div>
                )}
            </div>
        </div>
    </PageContentBlock>
);

type ServerErrorProps = (Omit<PropsWithBack, 'image' | 'title'> | Omit<PropsWithRetry, 'image' | 'title'>) & {
    title?: string;
};

const ServerError = ({ title, ...props }: ServerErrorProps) => (
    <ScreenBlock title={title || 'Something went wrong'} image={ServerErrorSvg} {...props} />
);

const NotFound = ({ title, message, onBack }: Partial<Pick<ScreenBlockProps, 'title' | 'message' | 'onBack'>>) => (
    <ScreenBlock
        title={title || '404'}
        image={NotFoundSvg}
        message={message || 'The requested resource was not found.'}
        onBack={onBack}
    />
);

export { ServerError, NotFound };
export default ScreenBlock;
