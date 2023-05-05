import React, { useState } from 'react';
import PageContentBlock from '../elements/PageContentBlock';
import TitledGreyBox from '../elements/TitledGreyBox';
import { Form, Formik } from 'formik';
import Button from '../elements/Button';
import { number, object, string } from 'yup';
import { useStoreState } from '@/state/hooks';
import { getNodes, Node } from '@/api/store/getNodes';
import Field from '@/components/elements/Field';
import { getNests, Nest } from '@/api/store/getNests';
import { Egg, getEggs } from '@/api/store/getEggs';
import { faCube, faEgg, faLayerGroup, faList, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import StoreContainer from './elements/StoreContainer';
import Select from '../elements/Select';

export default function DeployContainer() {
    const user = useStoreState((state) => state.user.data!);

    const [egg, setEgg] = useState<number>(0);
    const [eggs, setEggs] = useState<Egg[]>();
    const [nest, setNest] = useState<number>(0);
    const [nests, setNests] = useState<Nest[]>();
    const [node, setNode] = useState<number>(0);
    const [nodes, setNodes] = useState<Node[]>();

    return (
        <PageContentBlock title={'Deploy a server'} description={'Choose your plan and create your server!'}>
            <Formik
                onSubmit={() => {
                    console.log('submit login');
                }}
                initialValues={{
                    name: `${user.username}'s server`,
                    description: 'Write a server description here.',
                    nest: 1,
                    egg: 1,
                    node: 1,
                }}
                validationSchema={object().shape({
                    name: string().required().min(3),
                    description: string().optional().min(3).max(191),

                    node: number().required().default(node),
                    nest: number().required().default(nest),
                    egg: number().required().default(egg),
                })}
            >
                <Form>
                    <StoreContainer title={'Basic details'} className={'lg:grid lg:grid-cols-2 my-10 gap-4'}>
                        <TitledGreyBox title={'Server name'} icon={faStickyNote} className={'mt-8 sm:mt-0'}>
                            <Field name={'name'} />
                            <p className={'mt-1 text-xs'}>
                                Enter the name that you&apos;ll use to identify this server.
                            </p>
                        </TitledGreyBox>
                        <TitledGreyBox title={'Server description'} icon={faList} className={'mt-8 sm:mt-0'}>
                            <Field name={'description'} />
                            <p className={'mt-1 text-xs'}>Set a description for your server.</p>
                            <p className={'mt-1 text-xs text-orange-400'}>* Optional</p>
                        </TitledGreyBox>
                    </StoreContainer>
                    <StoreContainer title={'Server shape'} className={'lg:grid lg:grid-cols-2 my-10 gap-4'}>
                        todo: implement this
                    </StoreContainer>
                    <StoreContainer title={'Deployment settings'} className={'lg:grid lg:grid-cols-3 my-10 gap-4'}>
                        <TitledGreyBox title={'Available Nodes'} icon={faLayerGroup} className={'mt-8 sm:mt-0'}>
                            <Select name={'node'} onChange={(e) => setNode(parseInt(e.target.value))}>
                                {!node && <option>Select a node...</option>}
                                {nodes.map((n) => (
                                    <option key={n.id} value={n.id}>
                                        {n.name} ({n.location}) |{' '}
                                        {100 - parseInt(((n?.used / n?.total) * 100).toFixed(0))}% free | {n.deployFee}{' '}
                                        credits
                                    </option>
                                ))}
                            </Select>
                            <p className={'mt-1 text-xs text-gray-400'}>Select a node to deploy your server to.</p>
                        </TitledGreyBox>
                        <TitledGreyBox title={'Server Nest'} icon={faCube} className={'mt-8 sm:mt-0'}>
                            <Select name={'nest'} onChange={(nest) => changeNest(nest)}>
                                {!nest && <option>Select a nest...</option>}
                                {nests.map((n) => (
                                    <option key={n.id} value={n.id}>
                                        {n.name}
                                    </option>
                                ))}
                            </Select>
                            <p className={'mt-1 text-xs text-gray-400'}>
                                Select a nest (egg category) to use for your server.
                            </p>
                        </TitledGreyBox>
                        <TitledGreyBox title={'Server Egg'} icon={faEgg} className={'mt-8 sm:mt-0'}>
                            <Select name={'egg'} onChange={(e) => setEgg(parseInt(e.target.value))}>
                                {!egg && <option>Select an egg...</option>}
                                {eggs.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </Select>
                            <p className={'mt-1 text-xs text-gray-400'}>Choose the software to deploy</p>
                        </TitledGreyBox>
                    </StoreContainer>

                    <div className={'text-right'}>
                        <Button className={'mt-6 w-1/6 mb-4'}>Deploy</Button>
                    </div>
                </Form>
            </Formik>
        </PageContentBlock>
    );
}
