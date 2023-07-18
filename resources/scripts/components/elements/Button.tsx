import React from 'react';
import styled, { css } from 'styled-components/macro';
import tw from 'twin.macro';
import Spinner from '@/components/elements/Spinner';

interface Props {
    isLoading?: boolean;
    size?: 'xsmall' | 'small' | 'large' | 'xlarge';
    color?: 'green' | 'red' | 'primary' | 'grey';
    isSecondary?: boolean;
}

const ButtonStyle = styled.button<Omit<Props, 'isLoading'>>`
    ${tw`relative rounded-md p-2 tracking-wide font-medium transition-all duration-150 bg-primary-500 text-primary-50 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-neutral-800 focus:ring-offset-2`};

    ${(props) =>
        ((!props.isSecondary && !props.color) || props.color === 'primary') &&
        css<Props>`
            ${(props) => !props.isSecondary && tw`bg-primary-500 text-primary-50`};
        `};

    ${(props) =>
        props.color === 'grey' &&
        css`
            ${tw`border-neutral-600 bg-neutral-700  focus:ring-primary-500  text-neutral-50`};

            &:hover:not(:disabled) {
                ${tw`bg-neutral-700 border-neutral-700`};
            }
        `};

    ${(props) =>
        props.color === 'green' &&
        css<Props>`
            ${tw`border-green-600 bg-green-500 focus:ring-green-500  text-green-50`};

            ${(props) =>
                props.isSecondary &&
                css`
                    &:active:not(:disabled) {
                        ${tw`bg-green-600`};
                    }
                `};
        `};

    ${(props) =>
        props.color === 'red' &&
        css<Props>`
            ${tw`border-red-600 bg-red-500 focus:ring-red-500  text-red-50`};

            ${(props) =>
                props.isSecondary &&
                css`
                    &:active:not(:disabled) {
                        ${tw`bg-red-600 border-red-700`};
                    }
                `};
        `};

    ${(props) => props.size === 'xsmall' && tw`px-2 py-1 text-sm`};
    ${(props) => (!props.size || props.size === 'small') && tw`px-4 py-2`};
    ${(props) => props.size === 'large' && tw`p-4 text-sm`};
    ${(props) => props.size === 'xlarge' && tw`p-4 w-full`};

    ${(props) =>
        props.isSecondary &&
        css<Props>`
            ${tw`border-neutral-600 bg-transparent text-neutral-200`};

            &:hover:not(:disabled) {
                ${tw`border-neutral-500 text-neutral-100`};
                ${(props) => props.color === 'red' && tw`bg-red-500  text-red-50`};
                ${(props) => props.color === 'primary' && tw`bg-primary-500 text-primary-50`};
                ${(props) => props.color === 'green' && tw`bg-green-500  text-green-50`};
            }
        `};

    &:disabled {
        opacity: 0.55;
        cursor: default;
    }
`;

type ComponentProps = Omit<JSX.IntrinsicElements['button'], 'ref' | keyof Props> & Props;

const Button: React.FC<ComponentProps> = ({ children, isLoading, ...props }) => (
    <ButtonStyle {...props}>
        {isLoading && (
            <div css={tw`flex absolute justify-center items-center w-full h-full left-0 top-0`}>
                <Spinner size={'small'} />
            </div>
        )}
        <span css={isLoading ? tw`text-transparent` : undefined}>{children}</span>
    </ButtonStyle>
);

type LinkProps = Omit<JSX.IntrinsicElements['a'], 'ref' | keyof Props> & Props;

const LinkButton: React.FC<LinkProps> = (props) => <ButtonStyle as={'a'} {...props} />;

export { LinkButton, ButtonStyle };
export default Button;
