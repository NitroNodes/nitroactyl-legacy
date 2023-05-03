import {
    faChartBar,
    faDollarSign,
    faExternalLinkAlt,
    faHdd,
    faServer,
    faUpload,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import PageContentBlock from '../elements/PageContentBlock';

export default function IndexContainer() {
    return (
        <PageContentBlock>
            <header className='container w-full max-w-lg px-4 py-32 mx-auto -mt-40 md:-mt-8  text-center md:max-w-none'>
                <h1 className='text-5xl font-bold text-white sm:text-6xl md:text-7xl'>
                    <span className='block xl:inline'>Keep your projects</span>
                    <span className='block text-primary-500'>online 24/7</span>
                </h1>
                <p className='max-w-2xl m-auto mt-6 text-lg text-neutral-100'>
                    NitroNodes is a powerful server hosting service. We provide paid servers, but we have a free plan
                    which can suit your needs. We&apos;ve been providing high quality services since 18/5/2022
                </p>
                <div className='md:mt-12'>
                    <Link
                        to='/auth/login'
                        className='inline-flex gap-2 px-4 py-2 mt-5 font-bold text-white rounded-md bg-primary-600 hover:bg-primary-500 duration-75 '
                    >
                        <FontAwesomeIcon icon={faExternalLinkAlt} /> Start now
                    </Link>
                    <br />
                    <br />
                    <a
                        target='_blank'
                        rel='noreferrer'
                        className='text-neutral-300 hover:text-white'
                        href='https://trustpilot.com/review/nitronodes.xyz?languages=all'
                    >
                        Check our reviews on trustpilot
                    </a>
                </div>
            </header>
            <svg className='-mt-30 md:mt-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
                <path
                    fill='#805AD5'
                    fillOpacity='1'
                    d='M0,224L48,197.3C96,171,192,117,288,133.3C384,149,480,235,576,266.7C672,299,768,277,864,245.3C960,213,1056,171,1152,170.7C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
                ></path>
            </svg>
            <div className='-mt-4 bg-primary-500'>
                <section id='features' className='  ml-4 mr-4'>
                    <div className='px-7 mx-auto  max-w-7xl sm:text-center'>
                        <br className='visible md:hidden' />
                        <br className='visible md:hidden' />
                        <br className='visible md:hidden' />
                        <br className='md:visible' />
                        <br className='md:visible' />
                        <br className='md:visible' />
                        <h2 className='text-5xl  font-bold tracking-tight text-center'>Why us?</h2>
                        <p className='mt-2 text-2xl text-center text-neutral-100'>
                            These are the reasons why you should choose us
                        </p>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 my-12 sm:my-16'>
                            <div className='flex flex-col items-center justify-between  px-4 py-12 space-y-4 duration-300 border rounded-lg shadow-lg border-neutral-800 bg-neutral-800  hover:scale-105 md:hover:-translate-y-3'>
                                <div className='flex w-12 h-12 text-center text-white rounded-lg bg-primary-500'>
                                    <FontAwesomeIcon icon={faChartBar} className='m-auto' />
                                </div>
                                <p className='font-bold text-white text-md'>99% Uptime</p>
                                <p className='text-base text-center text-neutral-300'>
                                    We provide 24/7 hosting without lag, all of this for{' '}
                                    <span className='font-bold text-primary-300'>free</span>
                                </p>
                            </div>

                            <div className='flex flex-col items-center justify-between  px-4 py-12 space-y-4 duration-300 border rounded-lg shadow-lg border-neutral-800 bg-neutral-800 hover:scale-105 md:hover:-translate-y-3'>
                                <div className='flex w-12 h-12 text-center text-white rounded-lg bg-primary-500'>
                                    <FontAwesomeIcon icon={faDollarSign} className='m-auto' />
                                </div>
                                <p className='font-bold text-white text-md'>Free Plan</p>
                                <p className='text-base text-center text-neutral-300'>
                                    Our <span className='font-bold text-primary-300'>free plan</span> contains 1gb of
                                    shared ram, 5gb of storage space and 1 thread.
                                </p>
                            </div>

                            <div className='flex flex-col items-center justify-between  px-4 py-12 space-y-4 duration-300 border rounded-lg shadow-lg border-neutral-800 bg-neutral-800 hover:scale-105 md:hover:-translate-y-3'>
                                <div className='flex w-12 h-12 text-center text-white rounded-lg bg-primary-500'>
                                    <FontAwesomeIcon icon={faUpload} className='m-auto' />
                                </div>
                                <p className='font-bold text-white text-md'>One click server creation</p>
                                <p className='text-base text-center text-neutral-300'>
                                    With our large amount of eggs, deployment is very&nbsp;
                                    <span className='font-bold text-primary-300'>easy</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='px-10 mx-auto mt-16 max-w-7xl sm:text-center'>
                    <h2 className='text-5xl font-bold tracking-tight text-center sm:text-5xl'>Statistics</h2>
                    <p className='mt-2 text-2xl text-center text-neutral-100'>How many people trust us</p>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 my-12 sm:my-16'>
                        <div className='flex flex-col items-center justify-center py-10 duration-300 border rounded-lg shadow-lg border-neutral-800 bg-neutral-800  hover:scale-105 md:hover:-translate-y-3'>
                            <div className='flex w-12 h-12 text-center text-white rounded-lg bg-primary-500'>
                                <FontAwesomeIcon icon={faUser} className='m-auto' />
                            </div>
                            <p className='mt-4 font-bold text-white'>Users</p>
                            <p className='mt-2 text-md text-neutral-300'>300+</p>
                        </div>
                        <div className='flex flex-col items-center justify-center py-10 duration-300 border rounded-lg shadow-lg border-neutral-800 bg-neutral-800  hover:scale-105 md:hover:-translate-y-3'>
                            <div className='flex w-12 h-12 text-center text-white rounded-lg bg-primary-500'>
                                <FontAwesomeIcon icon={faServer} className='m-auto' />
                            </div>
                            <p className='mt-4 font-bold text-white'>Servers</p>
                            <p className='mt-2 text-md text-neutral-300'>90+</p>
                        </div>
                        <div className='flex flex-col items-center justify-center py-10 duration-300 border rounded-lg shadow-lg border-neutral-800 bg-neutral-800  hover:scale-105 md:hover:-translate-y-3'>
                            <div className='flex w-12 h-12 text-center text-white rounded-lg bg-primary-500'>
                                <FontAwesomeIcon icon={faHdd} className='m-auto' />
                            </div>
                            <p className='mt-4 font-bold text-white'>Nodes</p>
                            <p className='mt-2 text-md text-neutral-300'>1</p>
                        </div>
                    </div>
                </section>
                <section className='mt-16 py-7 sm:py-16 text-white'>
                    <div className='px-10 mx-auto max-w-7xl sm:text-center'>
                        <h2 className='text-5xl font-bold tracking-tight text-center sm:text-5xl'>
                            Supported Software
                        </h2>
                        <p className='mt-2 text-2xl text-center text-neutral-100'>
                            Deploy your favourite programming languages/software
                        </p>
                        <div className='grid grid-cols-1 sm:grid-cols-1 gap-10 my-12 sm:my-16'>
                            <div className='flex flex-col items-center justify-center py-10 duration-300 border rounded-lg shadow-lg border-neutral-800 bg-neutral-800  hover:scale-105 md:hover:-translate-y-3'>
                                <img
                                    className='h-auto'
                                    src='/assets/img/python.png'
                                    height={64}
                                    width={64}
                                    alt={'python'}
                                />
                                <p className='mt-4 font-bold'>Python</p>
                                <p className='mt-2 text-sm text-neutral-300'>Host your bots/websites</p>
                            </div>
                            <div className='flex flex-col items-center justify-center py-10 duration-300 border rounded-lg shadow-lg border-neutral-800 bg-neutral-800  hover:scale-105 md:hover:-translate-y-3'>
                                <img height={64} width={64} src='/assets/img/java.png' alt='java' />
                                <p className='mt-4 font-bold'>Java</p>
                                <p className='mt-2 text-sm text-neutral-300'>Host your gameservers/bots</p>
                            </div>
                            <div className='flex flex-col items-center justify-center py-10 duration-300 border rounded-lg shadow-lg border-neutral-800 bg-neutral-800  hover:scale-105 md:hover:-translate-y-3'>
                                <img height={64} width={64} src='/assets/img/nodejs.svg' alt='php' />
                                <p className='mt-4 font-bold'>NodeJS</p>
                                <p className='mt-2 text-sm text-neutral-300'>Host your bots/websites</p>
                            </div>
                        </div>
                    </div>
                    <p className='-mt-10 font-bold text-center text-md text-semibold'>and more...</p>
                </section>
            </div>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
                <path
                    fill='#805AD5'
                    fillOpacity='1'
                    d='M0,160L48,144C96,128,192,96,288,80C384,64,480,64,576,90.7C672,117,768,171,864,176C960,181,1056,139,1152,138.7C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
                ></path>
            </svg>
            <section className='mt-6 ml-12 md:ml-64 md:-mt-5'>
                <h2 className='text-3xl font-bold'>So why dont you give it a try?</h2>
                <p className='text-xl text-neutral-200'>No payments required!</p>
                <br />
                <Link
                    to='/auth/register'
                    className='px-6 py-2 font-bold text-white rounded-md bg-primary-600 hover:bg-primary-500 duration-75 '
                >
                    Create an free account
                </Link>
            </section>
        </PageContentBlock>
    );
}
