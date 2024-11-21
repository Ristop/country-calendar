import React, { forwardRef, ReactNode } from 'react';
import './YearField.scss';
import clsx from 'clsx';
import { useTextField } from 'react-aria';
import { useForwardedRef } from '../../components/Button';

export enum Size {
  SMALL = 'small',
}

export interface YearFieldProps {
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

  size?: Extract<Size, Size.SMALL>;
  className?: string;
}

const YearField = forwardRef<HTMLInputElement, YearFieldProps>(
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
      size = Size.SMALL,
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
        <div className={clsx(`year-field year-field-${size}`, { disabled: isDisabled }, { 'is-invalid': isInvalid })}>
          <input
            {...inputProps}
            ref={ref}
            type={'text'}
            className={clsx('year-field-input', `year-field-input-${size}`)}
          />
        </div>
      </div>
    );
  }
);
export default YearField;
