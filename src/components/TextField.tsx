import React, { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import { useTextField } from 'react-aria';
import { useForwardedRef } from './Button';

export interface TextFieldProps {
  label?: ReactNode;
  ariaLabel?: string;
  description?: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  isInvalid?: boolean;
  className?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      ariaLabel,
      defaultValue,
      value,
      onChange,
      onBlur,
      placeholder,
      disabled: isDisabled,
      required: isRequired,
      isInvalid,
      className = '',
    },
    propsRef
  ) => {
    const ref = useForwardedRef<HTMLInputElement>(propsRef);
    const { inputProps } = useTextField(
      {
        label,
        'aria-label': ariaLabel,
        defaultValue,
        value,
        onChange,
        onBlur(e) {
          onBlur?.((e.currentTarget as HTMLInputElement).value);
        },
        placeholder,
        isDisabled,
        isRequired,
        isInvalid,
      },
      ref
    );

    return (
      <div className={className}>
        <div className={clsx(`text-field flex box-border border border-main-border bg-secondary rounded h-9 p-2`, { disabled: isDisabled }, { 'is-invalid': isInvalid })}>
          <input
            {...inputProps}
            ref={ref}
            type={'text'}
            autoFocus
            className={clsx('[all:unset] h-full w-full text-field-input placeholder:text-gray')}
          />
        </div>
      </div>
    );
  }
);
export default TextField;
