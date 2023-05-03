import { breakpoint } from '@/theme';
import React from 'react';
import tw, { styled } from 'twin.macro';
import ContentBox from '../elements/ContentBox';
import PageContentBlock from '../elements/PageContentBlock';

const Container = styled.div`
    ${tw`flex flex-wrap`};

    & > div {
        ${tw`w-full`};

        ${breakpoint('sm')`
      width: calc(50% - 1rem);
    `}

        ${breakpoint('md')`
      ${tw`w-auto flex-1`};
    `}
    }
`;

export default function FundsContainer() {
    const balance = 0;
    return (
        <PageContentBlock title={'Credits'} description={'Deposit and view your credits!'}>
            <Container className={'lg:grid lg:grid-cols-2 my-10'}>
                <ContentBox title={'Account Balance'} showFlashes={'account:balance'} css={tw`sm:mt-0`}>
                    <h1 css={tw`text-7xl flex justify-center items-center`}>
                        {balance}
                        <span className={'text-base'}>$</span>
                    </h1>
                </ContentBox>
                <ContentBox title={'Purchase credits'} showFlashes={'account:gateways'} css={tw`mt-8 sm:mt-0 sm:ml-8`}>
                    Coming soon
                </ContentBox>
            </Container>
        </PageContentBlock>
    );
}
