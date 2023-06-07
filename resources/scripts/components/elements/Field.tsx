import React, { forwardRef } from 'react';
import { Field as FormikField, FieldProps } from 'formik';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface OwnProps {
    name: string;
    light?: boolean;
    label?: string;
    description?: string;
    validate?: (value: any) => undefined | string | Promise<any>;
    rightIcon?: IconDefinition;
    onRightIconClick?: () => void;
}

type Props = OwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>;

const Field = forwardRef<HTMLInputElement, Props>(
    ({ id, name, light = false, label, description, validate, rightIcon, onRightIconClick, ...props }, ref) => (
        <FormikField name={name} validate={validate}>
            {({ field, form: { errors, touched } }: FieldProps) => (
                <div>
                    {label && (
                        <Label htmlFor={id} isLight={light}>
                            {label}
                        </Label>
                    )}
                    <Input
                        id={id}
                        {...field}
                        {...props}
                        isLight={light}
                        hasError={!!(touched[field.name] && errors[field.name])}
                        ref={ref}
                        rightIcon={
                            rightIcon && (
                                <span onClick={onRightIconClick} className='field-right-icon'>
                                    <FontAwesomeIcon icon={rightIcon} />
                                </span>
                            )
                        }
                    />
                    {touched[field.name] && errors[field.name] ? (
                        <p className='input-help error'>
                            {errors[field.name]?.charAt(0).toUpperCase() + errors[field.name]?.slice(1)}
                        </p>
                    ) : description ? (
                        <p className='input-help'>{description}</p>
                    ) : null}
                </div>
            )}
        </FormikField>
    )
);

Field.displayName = 'Field';

export default Field;
