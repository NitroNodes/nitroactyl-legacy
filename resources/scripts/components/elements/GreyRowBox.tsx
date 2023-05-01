import styled from 'styled-components/macro';
import tw from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`flex rounded-md no-underline text-neutral-200 items-center bg-neutral-800 shadow-lg p-4 transition-colors duration-150 overflow-hidden hover:scale-110`};

    & .icon {
        ${tw`rounded-full flex items-center justify-center bg-neutral-600 p-3`};
    }
`;
