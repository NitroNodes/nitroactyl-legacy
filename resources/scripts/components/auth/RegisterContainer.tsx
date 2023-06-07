import React, { useEffect, useRef, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import LoginFormContainer from '@/components/auth/LoginFormContainer';
import { useStoreState } from 'easy-peasy';
import { Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import Field from '@/components/elements/Field';
import tw from 'twin.macro';
import Button from '@/components/elements/Button';
import Reaptcha from 'reaptcha';
import useFlash from '@/plugins/useFlash';
import register from '@/api/auth/register';

interface Values {
    email: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
}

const RegisterContainer = ({ history }: RouteComponentProps) => {
    const ref = useRef<Reaptcha>(null);
    const [token, setToken] = useState('');

    const { clearFlashes, clearAndAddHttpError, addFlash } = useFlash();
    const { enabled: recaptchaEnabled, siteKey } = useStoreState((state) => state.settings.data!.recaptcha);

    useEffect(() => {
        clearFlashes();
    }, []);

    const onSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        clearFlashes();

        // If there is no token in the state yet, request the token and then abort this submit request
        // since it will be re-submitted when the recaptcha data is returned by the component.
        if (recaptchaEnabled && !token) {
            ref.current!.execute().catch((error) => {
                console.error(error);

                setSubmitting(false);
                clearAndAddHttpError({ error });
            });

            return;
        }
        register({ ...values, recaptchaData: token })
            .then((response) => {
                if (response.complete) {
                    history.replace('/auth/login');
                    addFlash({
                        key: 'auth:register',
                        type: 'success',
                        title: 'success',
                        message: 'Account has been successfully created.',
                    });
                    return;
                }

                history.replace('/auth/register');
            })
            .catch((error) => {
                console.error(error);

                setToken('');
                if (ref.current) ref.current.reset();

                setSubmitting(false);
                clearAndAddHttpError({ error });
            });
    };

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={{ username: '', password: '', email: '', firstname: '', lastname: '' }}
            validationSchema={object().shape({
                username: string().required('A username must be provided.'),
                email: string().required('A email must be provided.'),
                password: string().required('Please enter a password'),
                firstname: string().required('Please enter your first name'),
                lastname: string().required('Please enter your last name'),
            })}
        >
            {({ isSubmitting, setSubmitting, submitForm }) => (
                <LoginFormContainer title={'Register'} css={tw`w-full flex`}>
                    <div>
                        <Field type={'email'} label={'Email'} name={'email'} disabled={isSubmitting} />
                    </div>
                    <div css={tw`mt-6`}>
                        <Field type={'text'} label={'First Name'} name={'firstname'} disabled={isSubmitting} />
                    </div>
                    <div css={tw`mt-6`}>
                        <Field type={'text'} label={'Last Name'} name={'lastname'} disabled={isSubmitting} />
                    </div>
                    <div css={tw`mt-6`}>
                        <Field type={'text'} label={'Username'} name={'username'} disabled={isSubmitting} />
                    </div>
                    <div css={tw`mt-6`}>
                        <Field type={'password'} label={'Password'} name={'password'} disabled={isSubmitting} />
                    </div>
                    <div css={tw`mt-6`}>
                        <Button type={'submit'} size={'xlarge'} isLoading={isSubmitting} disabled={isSubmitting}>
                            Create Account
                        </Button>
                    </div>
                    {recaptchaEnabled && (
                        <Reaptcha
                            ref={ref}
                            size={'invisible'}
                            sitekey={siteKey || '_invalid_key'}
                            onVerify={(response) => {
                                setToken(response);
                                submitForm();
                            }}
                            onExpire={() => {
                                setSubmitting(false);
                                setToken('');
                            }}
                        />
                    )}
                    <div css={tw`mt-4 text-center`}>
                        <Link
                            to={'/auth/login'}
                            css={tw`ml-2 text-xs text-neutral-200 tracking-wide no-underline uppercase transition duration-150 hover:text-primary-400`}
                        >
                            Already have an account?
                        </Link>
                    </div>
                </LoginFormContainer>
            )}
        </Formik>
    );
};

export default RegisterContainer;
