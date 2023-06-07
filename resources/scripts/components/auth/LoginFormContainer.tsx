import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import defaultLogo from '@/assets/images/logo.png';
import { ApplicationStore } from '@/state';
import { useStoreState } from 'easy-peasy';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

const Container = styled.div`
    ${breakpoint('sm')`
        ${tw`w-4/5 mx-auto`}
    `};

    ${breakpoint('md')`
        ${tw`p-10`}
    `};

    ${breakpoint('lg')`
        ${tw`w-3/5`}
    `};

    ${breakpoint('xl')`
        ${tw`w-full`}
        max-width: 700px;
    `};
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => (
    <Container>
        <Link to={'/'}>
            <img
                src={useStoreState((state: ApplicationStore) => state.settings.data!.logo)}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = defaultLogo;
                }}
                css={tw`w-32 mx-auto hover:opacity-75 duration-75 mt-12 md:-mt-12`}
            />
        </Link>
        {title && <h2 css={tw`text-3xl text-center text-neutral-100 font-medium py-6`}>{title}</h2>}
        <FlashMessageRender css={tw`mb-2 px-1`} />
        <Form {...props} ref={ref}>
            <div css={tw`w-full bg-neutral-800 shadow-md rounded-lg p-4 mx-1`}>
                <div>{props.children}</div>
            </div>
        </Form>
        <p css={tw`text-center text-neutral-500 text-xs mt-6`}>
            &copy; {new Date().getFullYear()}&nbsp;NitroNodes, built on Pterodactyl
        </p>
    </Container>
));
