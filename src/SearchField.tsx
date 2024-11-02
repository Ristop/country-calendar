import React, { forwardRef, ReactNode, useRef } from 'react';
import './SearchField.scss';
import clsx from 'clsx';
import { useTextField } from 'react-aria';

export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export interface SearchFieldProps {
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
  size?: Extract<Size, Size.SMALL | Size.MEDIUM>;
  className?: string;
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({
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
    size = Size.MEDIUM,
    className = '',
  }) => {
    const ref = useRef<HTMLInputElement>(null);
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
        <div className={clsx(`text-field text-field-${size}`, { disabled: isDisabled }, { 'is-invalid': isInvalid })}>
          <input
            {...inputProps}
            ref={ref}
            type={'text'}
            className={clsx('text-field-input', `text-field-input-${size}`)}
          />
        </div>
      </div>
    );
  }
);
export default SearchField;
