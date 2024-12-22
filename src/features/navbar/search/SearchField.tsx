import React, { forwardRef, ReactNode } from 'react';
import './SearchField.scss';
import clsx from 'clsx';
import { useTextField } from 'react-aria';
import { useForwardedRef } from '../../../components/Button';

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
  className?: string;
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
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
        <div className={clsx(`text-field`, { disabled: isDisabled }, { 'is-invalid': isInvalid })}>
          <input
            {...inputProps}
            ref={ref}
            type={'text'}
            autoFocus
            className={clsx('text-field-input')}
          />
        </div>
      </div>
    );
  }
);
export default SearchField;
